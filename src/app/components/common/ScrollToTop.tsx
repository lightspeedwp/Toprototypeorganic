import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * ScrollToTop component.
 * 
 * Automatically scrolls the window to the top whenever the route pathname changes.
 * This ensures that navigating between pages always starts at the top of the content.
 * 
 * Usage: Render this component once inside your Router (e.g., in RootLayout).
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
