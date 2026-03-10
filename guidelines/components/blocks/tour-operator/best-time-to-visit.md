# Best Time to Visit Block

**Component:** `BestTimeToVisit.tsx`  
**WordPress Block:** `lsx/best-time-to-visit`  
**Category:** tour-operator  
**Location:** `/src/app/components/blocks/tour-operator/BestTimeToVisit.tsx`

---

## Purpose

The **Best Time to Visit** block summarizes the optimal travel months for a destination. It displays recommended months for visiting based on weather, wildlife viewing, cultural events, or seasonal attractions. This helps travelers plan their trips during ideal conditions.

---

## Design System Requirements

### Colors
- ✅ Use `text-foreground` for main text
- ✅ Use `text-muted-foreground` for secondary text
- ✅ Use `bg-primary/10` or `bg-accent/10` for highlighted months
- ✅ Use `border-border` for card borders

### Typography
- ✅ **Heading:** Lora font family
- ✅ **Body text:** Noto Sans font family
- ✅ Month names: `font-medium`

### Spacing
- ✅ Section spacing: `space-y-4`
- ✅ Month grid gap: `gap-2`
- ✅ Padding: `p-4` for cards

---

## Component Structure

### Props Interface

```typescript
interface BestTimeToVisitProps {
  /** Optimal months (array of month names or numbers) */
  optimalMonths: string[] | number[];
  /** Description of why these months are best */
  description?: string;
  /** Display style */
  variant?: 'grid' | 'list' | 'calendar';
  /** Show month abbreviations (Jan, Feb) or full names */
  abbreviate?: boolean;
  /** Additional CSS classes */
  className?: string;
}
```

### Example Implementation

```tsx
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function BestTimeToVisit({
  optimalMonths,
  description,
  variant = 'grid',
  abbreviate = false,
  className,
}: BestTimeToVisitProps) {
  const monthNames = abbreviate ? MONTHS_SHORT : MONTHS;

  // Convert month numbers to names if needed
  const selectedMonths = optimalMonths.map(m =>
    typeof m === 'number' ? monthNames[m - 1] : m
  );

  if (variant === 'grid') {
    return (
      <div className={cn("space-y-3", className)}>
        <h3 className="text-foreground">Best Time to Visit</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {monthNames.map((month, index) => {
            const isOptimal = selectedMonths.includes(month);
            return (
              <div
                key={month}
                className={cn(
                  "rounded-md border p-2 text-center text-sm transition-colors",
                  isOptimal
                    ? "border-primary bg-primary/10 font-medium text-foreground"
                    : "border-border bg-muted/30 text-muted-foreground"
                )}
              >
                {month}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // List variant
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-foreground">Best Time to Visit</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <p className="text-foreground">
        <strong>Recommended months:</strong>{' '}
        {selectedMonths.join(', ')}
      </p>
    </div>
  );
}
```

---

## Usage Examples

### Basic Grid (Recommended)

```tsx
<BestTimeToVisit
  optimalMonths={['June', 'July', 'August', 'September']}
  description="Best weather and wildlife viewing during dry season"
/>
```

### With Month Numbers

```tsx
<BestTimeToVisit
  optimalMonths={[6, 7, 8, 9]} // June - September
  description="Peak safari season with excellent game viewing"
  abbreviate
/>
```

### List Variant

```tsx
<BestTimeToVisit
  optimalMonths={['December', 'January', 'February']}
  description="Warm summer months ideal for beach activities"
  variant="list"
/>
```

### In Destination Page

```tsx
function DestinationSingle({ destination }) {
  return (
    <section className="space-y-6">
      <h2>Travel Information</h2>
      
      <BestTimeToVisit
        optimalMonths={destination.bestMonths}
        description={destination.seasonalInfo}
      />
      
      {/* Other destination info */}
    </section>
  );
}
```

---

## Accessibility

- ✅ Semantic HTML: Use `<section>` wrapper
- ✅ Clear labels: "Best Time to Visit" heading
- ✅ Color contrast: Highlighted months meet WCAG AA
- ✅ Alternative text: Description explains why months are optimal

---

## Responsive Behavior

```tsx
// Mobile: 3 columns
// Tablet: 4 columns
// Desktop: 6 columns (2 rows)
<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
  {/* Month badges */}
</div>
```

---

## Variants

### 1. Visual Calendar Grid
Displays all 12 months with optimal ones highlighted.

### 2. List Format
Simple comma-separated list of optimal months.

### 3. Season Badges
Groups months into seasons (Summer, Winter, etc.).

---

## Testing Checklist

- [ ] All 12 months display correctly
- [ ] Optimal months are highlighted
- [ ] Description shows if provided
- [ ] Responsive grid works (3/4/6 columns)
- [ ] Month names vs abbreviations work
- [ ] Color contrast is sufficient
- [ ] Works in light and dark modes

---

**Last Updated:** December 29, 2024  
**Status:** ✅ Implemented  
**WordPress Block:** `lsx/best-time-to-visit`
