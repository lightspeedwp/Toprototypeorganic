/**
 * Back to Top Button Component.
 *
 * Floating button that appears when user scrolls down.
 * Smoothly scrolls back to top of page on click.
 * 
 * All styling uses CSS custom properties from the design system.
 * Typography: Lora (serif) for headings, Noto Sans (sans-serif) for body/UI.
 *
 * UPDATED: March 2026 - Migrated to Phosphor Icons for better styling options
 *
 * @module BackToTopButton
 * @category common
 */

import { useState, useEffect } from "react";
import { CaretUp } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Back to Top Button component.
 * 
 * A utility component that provides an easy way for users to return to the
 * top of long pages. The button appears automatically after scrolling and
 * uses smooth scrolling for better UX.
 * 
 * **Usage Guidelines:**
 * - Use on all pages with scrollable content
 * - Button appears at 300px scroll threshold
 * - Fixed position in bottom-right corner
 * - Z-index of 60 (above most content, below modals)
 * 
 * **WordPress Mapping:**
 * 
 * Not directly equivalent to WordPress block. This is a client-side
 * utility component that would be added to the theme via JavaScript.
 * 
 * **Performance:**
 * - Scroll event is passive
 * - State updates throttled by React
 * - Cleanup on unmount prevents memory leaks
 * 
 * @component
 * @category common
 * 
 * @returns {JSX.Element} Rendered back-to-top button
 * 
 * @example
 * // Basic usage (in PageLayout)
 * <PageLayout>
 *   <Header />
 *   <main>{children}</main>
 *   <Footer />
 *   <BackToTopButton />
 * </PageLayout>
 * 
 * @example
 * // Button only appears after scrolling
 * // User scrolls down 300px → Button fades in
 * // User clicks button → Smooth scroll to top
 * // User reaches top → Button fades out
 */
export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /**
     * Toggles button visibility based on scroll position.
     * Shows button after scrolling past 300px threshold.
     */
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

  /**
   * Smoothly scrolls the page to the top.
   * Uses native smooth scrolling behavior for better performance.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn("wp-back-to-top", { "wp-back-to-top--visible": isVisible })}
      aria-label="Back to top"
    >
      <CaretUp size={20} weight="bold" />
    </button>
  );
}

BackToTopButton.displayName = "BackToTopButton";