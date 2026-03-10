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
import React from "react";

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="section container">
          <div className="wp-block-card">
            <h2 className="wp-block-heading is-style-h2 has-destructive-color">Something went wrong.</h2>
            <pre className="wp-block-code text-fluid-sm whitespace-pre-wrap">{this.state.error?.toString()}</pre>
            <div className="py-section-sm">
              <pre className="wp-block-code text-fluid-xs whitespace-pre-wrap">{this.state.error?.stack}</pre>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    <ErrorBoundary>
      <RouterProvider
        router={router}
        fallbackElement={<PageLoadingFallback />}
      />
    </ErrorBoundary>
  );
}