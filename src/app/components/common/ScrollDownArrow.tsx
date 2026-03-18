/**
 * Scroll Down Arrow Component.
 *
 * Animated indicator that appears in hero sections to suggest scrolling.
 * Fades out automatically as user scrolls down.
 * 
 * All styling uses CSS custom properties from the design system.
 * Typography: Lora (serif) for headings, Noto Sans (sans-serif) for body/UI.
 *
 * UPDATED: March 2026 - Migrated to Phosphor Icons for better styling options
 *
 * @module ScrollDownArrow
 * @category common
 */

import { useState, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Props for the ScrollDownArrow component.
 * 
 * @interface ScrollDownArrowProps
 */
interface ScrollDownArrowProps {
  /**
   * Optional ID of target element to scroll to.
   * If not provided, scrolls down one viewport height.
   * 
   * @example "content-section"
   */
  targetId?: string;
  
  /**
   * Optional ARIA label for accessibility.
   * Describes the scroll action to screen reader users.
   * 
   * @default "Scroll to explore"
   * 
   * @example "Scroll down to view tours"
   */
  label?: string;
  
  /**
   * Optional additional CSS classes to apply.
   */
  className?: string;
  
  /**
   * Optional flag to show label next to the arrow.
   * 
   * @default false
   */
  showLabel?: boolean;
}

/**
 * Scroll Down Arrow component.
 * 
 * An interactive visual indicator that helps users discover content below
 * the fold. Particularly useful on hero sections and full-height landing
 * pages where content isn't immediately visible.
 * 
 * **Usage Guidelines:**
 * - Use on full-height hero sections
 * - Position at bottom center of section
 * - Only use when content exists below
 * - Remove on mobile if space-constrained
 * - One per section maximum
 * 
 * **WordPress Mapping:**
 * 
 * Not directly equivalent to WordPress block. This is a UX enhancement
 * component that would be added via theme JavaScript or custom block.
 * 
 * **Animation:**
 * - Default: Bouncing animation (Tailwind animate-bounce)
 * - Hover: Animation stops
 * - Click: Smooth scroll to target
 * 
 * **Positioning:**
 * - Absolute positioning (requires relative parent)
 * - Bottom: 24px (mobile), 16px (desktop)
 * - Horizontal center (left-1/2 + -translate-x-1/2)
 * - Z-index: 10
 * 
 * @component
 * @category common
 * 
 * @param {ScrollDownArrowProps} props - Component properties
 * @returns {JSX.Element} Rendered scroll down button
 * 
 * @example
 * // Basic usage (scrolls down one viewport)
 * <section className="relative h-screen">
 *   <Hero title="Welcome" />
 *   <ScrollDownArrow />
 * </section>
 * 
 * @example
 * // Scroll to specific element
 * <section className="relative h-screen">
 *   <Hero title="Welcome" />
 *   <ScrollDownArrow targetId="tours-section" label="Scroll to view tours" />
 * </section>
 * 
 * @example
 * // Custom styling
 * <ScrollDownArrow 
 *   targetId="content" 
 *   className="text-white sm:bottom-8" 
 * />
 */
export function ScrollDownArrow({ 
  targetId, 
  label = "Scroll to explore",
  className,
  showLabel = false
}: ScrollDownArrowProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Handles scroll arrow click.
   * 
   * If targetId is provided, scrolls to that element.
   * Otherwise, scrolls down one viewport height.
   * Both use smooth scrolling behavior.
   */
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
      className={cn("wp-scroll-down-arrow", className, { "wp-scroll-down-arrow--hidden": isHidden })}
      aria-label={label}
    >
      <CaretDown size={24} className="wp-scroll-down-arrow__icon" />
      {showLabel && <span className="wp-scroll-down-arrow__label">{label}</span>}
    </button>
  );
}

ScrollDownArrow.displayName = "ScrollDownArrow";