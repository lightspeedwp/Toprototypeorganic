/**
 * Custom React hooks for the LightSpeed Tour Operator plugin.
 * 
 * This module provides reusable React hooks for common functionality
 * like responsive design detection.
 * 
 * @module use-mobile
 * @category hooks
 */

import { useEffect, useState } from "react";

/**
 * Mobile breakpoint width in pixels.
 * 
 * Viewports below this width are considered mobile.
 * This value matches Tailwind's `md:` breakpoint (768px).
 * 
 * @constant {number}
 */
const MOBILE_BREAKPOINT = 768;

/**
 * React hook that detects mobile viewport size.
 * 
 * This hook returns `true` when the viewport width is below 768px (mobile breakpoint),
 * and `false` for tablet/desktop widths. It uses a media query listener to update
 * reactively when the window is resized.
 * 
 * **Important SSR/Hydration Behavior:**
 * 
 * The hook returns `undefined` on the initial render (before mounting) to ensure
 * server-side rendering compatibility. After the component mounts, it updates to
 * the actual boolean value. Always handle the `undefined` case in your components.
 * 
 * **Breakpoint Reference:**
 * - Mobile: < 768px (< `md:` breakpoint)
 * - Desktop: >= 768px (`md:` and above)
 * 
 * **Performance:**
 * 
 * The hook uses `window.matchMedia()` for efficient media query listening rather
 * than polling `window.innerWidth`. The listener is automatically cleaned up when
 * the component unmounts.
 * 
 * @hook useIsMobile
 * @category hooks
 * 
 * @returns {boolean} True if viewport is mobile size (<768px), false otherwise.
 *   Returns `undefined` on first render (SSR-safe).
 * 
 * @example
 * // Basic mobile detection
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   
 *   return (
 *     <div>
 *       {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Handling undefined state (SSR-safe)
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   
 *   // Show loading state until hook initializes
 *   if (isMobile === undefined) {
 *     return <LoadingState />;
 *   }
 *   
 *   return (
 *     <div>
 *       {isMobile ? <MobileView /> : <DesktopView />}
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Conditional class names
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   
 *   return (
 *     <div className={cn(
 *       "base-class",
 *       isMobile && "mobile-specific-class"
 *     )}>
 *       Content
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Conditional prop values
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   
 *   return (
 *     <CardGrid columns={isMobile ? 1 : 3}>
 *       {/* Cards */}
 *     </CardGrid>
 *   );
 * }
 * 
 * @example
 * // Combined with other hooks
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   const [menuOpen, setMenuOpen] = useState(false);
 *   
 *   useEffect(() => {
 *     // Close mobile menu when switching to desktop
 *     if (!isMobile && menuOpen) {
 *       setMenuOpen(false);
 *     }
 *   }, [isMobile, menuOpen]);
 *   
 *   return (
 *     <div>
 *       {isMobile && (
 *         <button onClick={() => setMenuOpen(!menuOpen)}>
 *           Menu
 *         </button>
 *       )}
 *     </div>
 *   );
 * }
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Create media query list for mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Handler function to update state when media query changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Add listener for media query changes
    mql.addEventListener("change", onChange);
    
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Cleanup listener on unmount
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Convert undefined to false for convenience (!!undefined === false)
  return !!isMobile;
}
