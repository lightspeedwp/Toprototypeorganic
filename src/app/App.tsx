/**
 * Main Application component.
 * 
 * Uses React Router (Data Mode) with RouterProvider for URL-based
 * routing that maps to WordPress template hierarchy.
 * 
 * All page components are lazy-loaded for code splitting.
 * Route configuration is defined in ./routes.ts.
 * 
 * @module App
 * @category root
 */

import { memo } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

/**
 * Loading fallback component displayed while lazy-loaded
 * page components are being fetched.
 */
const PageLoadingFallback = memo(() => (
  <div className="section container flex flex--items-center flex--justify-center min-h-screen">
    <div className="text-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid has-primary-color border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="wp-block-paragraph has-muted-foreground-color">Loading page...</p>
    </div>
  </div>
));
PageLoadingFallback.displayName = "PageLoadingFallback";

/**
 * Main Application component.
 * 
 * Renders the RouterProvider which manages all routing,
 * layout, and page rendering.
 * 
 * @returns {JSX.Element} Rendered application
 */
export default function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<PageLoadingFallback />}
    />
  );
}