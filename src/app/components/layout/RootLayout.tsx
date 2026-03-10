/**
 * Root Layout component for React Router.
 * 
 * This component serves as the top-level layout that wraps all routes.
 * It provides the site shell (Header, Footer, Back-to-top) and all
 * context providers (Theme, Navigation, MobileMenu).
 * 
 * WordPress Alignment: This mirrors the overall block theme structure
 * where header.html + template content + footer.html compose every page.
 * 
 * @module RootLayout
 * @category layout
 */

import { Suspense } from "react";
import { useOutlet, useLocation, useNavigate } from "react-router";
import { Header } from "../parts/Header";
import { FooterNew } from "../parts/FooterNew";
import { BackToTopButton } from "../common/BackToTopButton";
import { SkipLink } from "../common/SkipLink";
import { LiveRegion } from "../common/LiveRegion";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { MobileMenuProvider } from "../parts/MobileMenu";
import { NavigationProvider } from "../../contexts/NavigationContext";
import { ScrollToTop } from "../common/ScrollToTop";
import { resolveNavigationPath } from "../../lib/navigation";
// Development dashboards temporarily disabled to prevent iframe issues
// import { AccessibilityDashboard } from "../common/AccessibilityDashboard";
// import { PerformanceDashboard } from "../common/PerformanceDashboard";
// import { MobileDashboard } from "../mobile/MobileDashboard";

/**
 * Root Layout component.
 * 
 * Renders the complete page structure with providers, header, footer,
 * and an Outlet for child route content.
 * 
 * NOTE: Uses useOutlet() hook instead of <Outlet /> component because
 * Outlet is a forwardRef component that causes {$$typeof, render} errors
 * in the Figma Make iframe environment (same issue as ScrollRestoration).
 */
export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const outlet = useOutlet();

  /**
   * Router-based navigation handler.
   * Provides backward compatibility with components that use onNavigate prop.
   * Maps legacy page IDs to proper URL paths where needed.
   */
  const handleNavigate = (target: string) => {
    const resolved = resolveNavigationPath(target);
    navigate(resolved);
  };

  // Derive a "currentPage" identifier from the current path for header/footer highlighting
  const currentPage = location.pathname;

  return (
    <ThemeProvider>
      <MobileMenuProvider onNavigate={handleNavigate}>
        <NavigationProvider>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col">
            {/* Skip Link - for keyboard navigation */}
            <SkipLink targetId="main-content">Skip to main content</SkipLink>
            
            {/* Live Region - for screen reader announcements */}
            <LiveRegion />
            
            {/* Header */}
            <Header currentPage={currentPage} onNavigate={handleNavigate} />
            
            {/* Main Content */}
            <main id="main-content" className="flex-1" tabIndex={-1}>
              <Suspense fallback={
                <div className="section container flex flex--items-center flex--justify-center min-h-[50vh]">
                  <div className="text-center">
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid has-primary-color border-r-transparent"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                    <p className="wp-block-paragraph has-muted-foreground-color">Loading page...</p>
                  </div>
                </div>
              }>
                {outlet}
              </Suspense>
            </main>
            
            {/* Footer */}
            <FooterNew currentPage={currentPage} onNavigate={handleNavigate} />
            
            {/* Back to Top Button */}
            <BackToTopButton />
          </div>
          
          {/* ScrollRestoration removed — ScrollToTop handles scroll-to-top on route change,
              and ScrollRestoration (a forwardRef DOM component) caused {$$typeof, render}
              errors in the Figma Make iframe environment. */}
          
          {/* Development Dashboards - Temporarily Disabled */}
          {/* <AccessibilityDashboard /> */}
          {/* <PerformanceDashboard /> */}
          {/* <MobileDashboard /> */}
        </NavigationProvider>
      </MobileMenuProvider>
    </ThemeProvider>
  );
}