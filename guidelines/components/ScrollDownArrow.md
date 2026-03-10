# ScrollDownArrow Component

**File:** `/src/app/components/common/ScrollDownArrow.tsx`  
**WordPress Mapping:** Client-side utility (not a WordPress block)  
**Category:** Common Component

---

## Purpose

Provides a visual indicator that encourages users to scroll down, typically used in hero sections or full-height landing sections. Includes smooth scroll animation to the next section.

---

## Usage

```typescript
import { ScrollDownArrow } from "../components/common/ScrollDownArrow";

<ScrollDownArrow targetId="next-section" />
```

---

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `targetId` | `string` | No | - | ID of the element to scroll to. If omitted, scrolls one viewport height down |
| `label` | `string` | No | `"Scroll to explore"` | Accessible label for screen readers |
| `className` | `string` | No | - | Additional CSS classes |

---

## Behavior

1. **Visibility:**
   - Typically visible on initial page load
   - May fade out after first scroll (optional)
   - Animated with bounce effect to draw attention

2. **Position:**
   - Absolutely positioned at bottom center of parent container
   - Parent should have `position: relative`
   - Positioned 24px from bottom on desktop, 16px on mobile

3. **Interaction:**
   - Clicking scrolls smoothly to target element or next section
   - Keyboard accessible (Tab, Enter/Space)
   - Focus indicator visible

4. **Animation:**
   - Continuous gentle bounce animation
   - Pauses on hover
   - Smooth scroll behavior when clicked

---

## Styling

**Required Design Tokens:**

```typescript
// Container
absolute bottom-6 left-1/2 -translate-x-1/2  // Centered at bottom
sm:bottom-4                                   // Mobile: 16px from bottom
z-10                                          // Above background content

// Button
bg-transparent               // No background (just icon)
text-primary-foreground      // Icon color (or text-white for dark backgrounds)

// Animation
animate-bounce               // Continuous bounce
hover:animate-none          // Pause on hover

// Interaction states
hover:text-accent           // Hover: change to accent color
focus-visible:ring-2        // Focus: ring indicator
focus-visible:ring-ring     // Focus: use ring color
focus-visible:ring-offset-2
```

**Icon:**
- Use `ChevronDown` from lucide-react
- Size: `w-8 h-8` (32px)
- Verify icon exists before importing:
  ```bash
  grep "ChevronDown" node_modules/lucide-react/dist/esm/icons/index.js
  ```

---

## Accessibility

1. **ARIA Label:** Custom or default "Scroll to explore"
2. **Keyboard:** Focusable and operable with Enter/Space
3. **Focus State:** Visible ring indicator
4. **Touch Target:** Minimum 44px × 44px
5. **Screen Reader:** Announces scroll action

---

## Implementation Example

```typescript
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface ScrollDownArrowProps {
  targetId?: string;
  label?: string;
  className?: string;
}

export function ScrollDownArrow({ 
  targetId, 
  label = "Scroll to explore",
  className 
}: ScrollDownArrowProps) {
  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "absolute bottom-6 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center animate-bounce text-primary-foreground transition-colors hover:animate-none hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:bottom-4",
        className
      )}
      aria-label={label}
    >
      <ChevronDown className="h-8 w-8" />
    </button>
  );
}
```

---

## Usage in Hero Components

Typically used at the bottom of full-height hero sections:

```typescript
// In Hero.tsx
import { ScrollDownArrow } from "../common/ScrollDownArrow";

export function Hero({ title, subtitle, image }: HeroProps) {
  return (
    <section className="relative h-screen">
      {/* Hero content */}
      <div className="relative z-10">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      
      {/* Scroll indicator */}
      <ScrollDownArrow targetId="main-content" />
    </section>
  );
}
```

---

## Variants

### Light Background (default)
```typescript
<ScrollDownArrow className="text-foreground" />
```

### Dark Background
```typescript
<ScrollDownArrow className="text-white" />
```

### Custom Color
```typescript
<ScrollDownArrow className="text-accent" />
```

---

## Notes

- Only use in full-height sections where content below fold needs discovery
- Do not use on pages with clear content hierarchy
- Parent container must have `position: relative`
- Consider hiding on mobile if hero is not full-height
- Animation can be disabled via `hover:animate-none` class
