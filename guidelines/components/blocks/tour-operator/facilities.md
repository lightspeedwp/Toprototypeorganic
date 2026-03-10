# Facilities Block

**Component:** `Facilities.tsx`  
**WordPress Block:** `lsx/facilities`  
**Category:** tour-operator  
**Location:** `/src/app/components/blocks/tour-operator/Facilities.tsx`

---

## Purpose

The **Facilities** block lists facilities and amenities offered by an accommodation. It displays icons and labels for features like Wi-Fi, parking, pool, restaurant, etc. This helps travelers understand what amenities are available at a property.

---

## Design System Requirements

### Colors
- ✅ Use `text-foreground` for labels
- ✅ Use `text-primary` for icons
- ✅ Use `bg-card` for facility cards
- ✅ Use `border-border` for borders

### Typography
- ✅ **Heading:** Lora font family
- ✅ **Facility labels:** Noto Sans font family
- ✅ Labels: `text-sm` or `text-base`

### Icons
- ✅ Use lucide-react icons
- ✅ Size: `16px` or `20px`
- ✅ Always verify icon exists before importing

### Spacing
- ✅ Grid gap: `gap-3` or `gap-4`
- ✅ Icon spacing: `gap-2`
- ✅ Section spacing: `space-y-4`

---

## Component Structure

### Props Interface

```typescript
interface FacilityItem {
  /** Facility name */
  name: string;
  /** Icon component from lucide-react */
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  /** Whether facility is available */
  available?: boolean;
}

interface FacilitiesProps {
  /** List of facilities */
  facilities: FacilityItem[];
  /** Display layout */
  variant?: 'grid' | 'list';
  /** Number of columns (grid only) */
  columns?: 2 | 3 | 4;
  /** Show icons */
  showIcons?: boolean;
  /** Heading text */
  heading?: string;
  /** Additional CSS classes */
  className?: string;
}
```

### Example Implementation

```tsx
import { Wifi, Car, Utensils, Coffee, Tv, Wind } from "lucide-react";

export function Facilities({
  facilities,
  variant = 'grid',
  columns = 3,
  showIcons = true,
  heading = "Facilities & Amenities",
  className,
}: FacilitiesProps) {
  const columnClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 md:grid-cols-3',
    4: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  if (variant === 'list') {
    return (
      <div className={cn("space-y-3", className)}>
        <h3 className="text-foreground">{heading}</h3>
        <ul className="space-y-2">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <li key={index} className="flex items-center gap-2">
                {showIcons && Icon && (
                  <Icon size={16} className="text-primary" />
                )}
                <span className="text-foreground">{facility.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-foreground">{heading}</h3>
      <div className={cn("grid gap-3", columnClass)}>
        {facilities.map((facility, index) => {
          const Icon = facility.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 rounded-md border border-border bg-card p-3"
            >
              {showIcons && Icon && (
                <Icon size={20} className="flex-shrink-0 text-primary" />
              )}
              <span className="text-sm text-foreground">{facility.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

---

## Usage Examples

### Grid Layout (Recommended)

```tsx
import { Wifi, Car, Utensils, Waves, Wind, Tv } from "lucide-react";

const facilities = [
  { name: "Free Wi-Fi", icon: Wifi },
  { name: "Free Parking", icon: Car },
  { name: "Restaurant", icon: Utensils },
  { name: "Swimming Pool", icon: Waves },
  { name: "Air Conditioning", icon: Wind },
  { name: "Flat-screen TV", icon: Tv },
];

<Facilities
  facilities={facilities}
  variant="grid"
  columns={3}
/>
```

### List Layout

```tsx
<Facilities
  facilities={facilities}
  variant="list"
  showIcons
/>
```

### Without Icons

```tsx
<Facilities
  facilities={facilities}
  variant="grid"
  columns={2}
  showIcons={false}
/>
```

### In Accommodation Page

```tsx
function AccommodationSingle({ accommodation }) {
  return (
    <section className="space-y-6">
      <h2>Amenities</h2>
      
      <Facilities
        facilities={accommodation.facilities}
        variant="grid"
        columns={3}
        heading="Available Facilities"
      />
    </section>
  );
}
```

---

## Common Facility Icons

```tsx
import {
  Wifi,              // Wi-Fi
  Car,               // Parking
  Utensils,          // Restaurant/Dining
  Coffee,            // Coffee/Tea
  Tv,                // Television
  Wind,              // Air Conditioning
  Waves,             // Swimming Pool
  Dumbbell,          // Gym/Fitness
  Sparkles,          // Spa
  Baby,              // Kid-friendly
  Dog,               // Pet-friendly
  Shield,            // Security
  Users,             // Conference Room
  Briefcase,         // Business Center
  UtensilsCrossed,   // Bar
  Bed,               // Room Service
  Key,               // 24-hour Reception
  MapPin,            // Concierge
} from "lucide-react";
```

---

## Accessibility

- ✅ Semantic HTML: Use `<ul>` or `<div>` with proper structure
- ✅ Icon labels: Facility names provide context
- ✅ Color contrast: Text meets WCAG AA
- ✅ Screen readers: Icons are decorative, text is meaningful

---

## Responsive Behavior

```tsx
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3-4 columns
<div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
  {/* Facility items */}
</div>
```

---

## Variants

### 1. Card Grid (Recommended)
Each facility in a card with icon and label.

### 2. Simple List
Vertical list with check icons.

### 3. Badge Style
Inline badges for compact display.

---

## Testing Checklist

- [ ] All facilities display
- [ ] Icons load correctly
- [ ] Responsive grid works
- [ ] List variant works
- [ ] Icons can be hidden
- [ ] Custom heading works
- [ ] Color contrast is sufficient
- [ ] Works in dark mode

---

**Last Updated:** December 29, 2024  
**Status:** ✅ Implemented  
**WordPress Block:** `lsx/facilities`
