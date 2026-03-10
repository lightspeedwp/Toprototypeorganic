# BackToTopButton Component

**File:** `/src/app/components/common/BackToTopButton.tsx`  
**WordPress Mapping:** Client-side utility (not a WordPress block)  
**Category:** Common Component

---

## Purpose

Provides a fixed-position button that scrolls the page back to the top when clicked. The button should only appear after the user has scrolled down a certain distance.

---

## Usage

```typescript
import { BackToTopButton } from "../components/common/BackToTopButton";

<BackToTopButton />
```

---

## Props

None. The component is self-contained and manages its own state.

---

## Behavior

1. **Visibility:**
   - Hidden by default
   - Appears when user scrolls down more than 300px
   - Uses smooth fade-in/fade-out transition

2. **Position:**
   - Fixed to bottom-right of viewport
   - z-index: 50 (above most content, below modals)
   - Positioned 24px from bottom and right edges on desktop
   - Positioned 16px from bottom and right edges on mobile

3. **Interaction:**
   - Clicking scrolls smoothly back to top of page
   - Keyboard accessible (Tab, Enter/Space)
   - Focus indicator visible

4. **Animation:**
   - Fade in when appearing: `opacity-0 → opacity-100` over 200ms
   - Fade out when hiding: `opacity-100 → opacity-0` over 200ms
   - Smooth scroll behavior when clicked

---

## Styling

**Required Design Tokens:**

```typescript
// Button container
bg-primary                // Background color
text-primary-foreground   // Icon color
rounded-full              // Fully circular button
shadow-sm                 // Subtle elevation

// Size
w-12 h-12                 // 48px × 48px (WCAG touch target)

// Position
fixed bottom-6 right-6    // Desktop: 24px from edges
sm:bottom-4 sm:right-4    // Mobile: 16px from edges

// Interaction states
hover:bg-primary/90       // Hover: 90% opacity
focus-visible:ring-2      // Focus: ring indicator
focus-visible:ring-ring   // Focus: use ring color
focus-visible:ring-offset-2
```

**Icon:**
- Use `ChevronUp` from lucide-react
- Size: `w-6 h-6` (24px)
- Verify icon exists before importing:
  ```bash
  grep "ChevronUp" node_modules/lucide-react/dist/esm/icons/index.js
  ```

---

## Accessibility

1. **ARIA Label:** `aria-label="Scroll to top"`
2. **Keyboard:** Focusable and operable with Enter/Space
3. **Focus State:** Visible ring indicator
4. **Touch Target:** Minimum 48px × 48px
5. **Screen Reader:** Announced as "Scroll to top" button

---

## Implementation Example

```typescript
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-opacity duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:bottom-4 sm:right-4",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
}
```

---

## Usage in Templates

The BackToTopButton is typically added to the PageLayout component so it appears on all pages:

```typescript
// In PageLayout.tsx
import { BackToTopButton } from "../common/BackToTopButton";

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
```

---

## Notes

- Do not add multiple instances to a single page
- Should work independently without props or configuration
- Scroll threshold (300px) can be adjusted if needed
- Consider adding to PageLayout for site-wide availability
