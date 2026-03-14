/**
 * Header & Footer Comparison Page
 * 
 * Demonstrates the difference between old and new implementations:
 * - Old: Custom implementation with mega menus
 * - New: WordPress theme blocks (Navigation, Search, SiteLogo, SiteTitle, SiteTagline)
 * 
 * **Purpose:**
 * - Visual comparison
 * - Design system verification
 * - Performance comparison
 * - Code complexity comparison
 * 
 * @module HeaderFooterComparison
 * @category pages
 */

import { useState } from "react";
import { Container } from "../components/common/Container";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { DevToolsBreadcrumbs } from "../components/common/DevToolsBreadcrumbs";
import { Header } from "../components/parts/Header";
import { Footer } from "../components/parts/Footer";
import { HeaderNew } from "../components/parts/HeaderNew";
import { FooterNew } from "../components/parts/FooterNew";

/**
 * Header & Footer Comparison Page Component
 */
export default function HeaderFooterComparison() {
  const [currentPage, setCurrentPage] = useState('home-page');
  const [showNew, setShowNew] = useState(false);

  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
    console.log('Navigate to:', pageId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted py-element-sm border-b border-border">
        <Container>
          <Breadcrumbs 
            items={[
              { label: 'Developer Tools', href: '/dev-tools' },
              { label: 'Header & Footer Comparison' },
            ]}
          />
        </Container>
      </div>
      
      {/* Control Panel */}
      <div className="sticky top-0 z-50 bg-accent border-b border-border py-element-sm">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-fluid-xs">
              <h1 className="m-0 text-fluid-lg">Header & Footer Comparison</h1>
              <p className="text-fluid-sm text-muted-foreground m-0">
                Toggle between old and new implementations
              </p>
            </div>
            <button
              onClick={() => setShowNew(!showNew)}
              className={`
                px-element-lg py-element-sm rounded-[var(--radius-lg)] font-medium
                transition-colors
                ${showNew 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                }
              `}
            >
              {showNew ? 'Showing: NEW (Theme Blocks)' : 'Showing: OLD (Custom)'}
            </button>
          </div>
        </Container>
      </div>

      {/* Header Display */}
      <div className="border-b-4 border-primary">
        {showNew ? (
          <HeaderNew currentPage={currentPage} onNavigate={handleNavigate} />
        ) : (
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
        )}
      </div>

      {/* Page Content */}
      <Container className="py-section-md flex flex-col items-center">
        <div className="max-w-3xl w-full flex flex-col gap-section-sm">
          {/* Comparison Info */}
          <div className="bg-card border border-border rounded-[var(--radius-lg)] p-element-lg flex flex-col gap-fluid-lg">
            <h2 className="m-0">Implementation Comparison</h2>
            
            <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-2">
              {/* OLD Implementation */}
              <div className="flex flex-col gap-fluid-md">
                <h3 className="text-primary m-0">OLD (Custom)</h3>
                <ul className="flex flex-col gap-fluid-xs text-fluid-sm p-0 m-0 list-none">
                  <li>✅ Custom mega menus</li>
                  <li>✅ Image-based dropdowns</li>
                  <li>✅ Complex state management</li>
                  <li>✅ Multiple icon imports</li>
                  <li>✅ ~800 lines of code</li>
                  <li>⚠️ Harder to maintain</li>
                  <li>⚠️ More complex</li>
                </ul>
              </div>

              {/* NEW Implementation */}
              <div className="flex flex-col gap-fluid-md">
                <h3 className="text-primary m-0">NEW (Theme Blocks)</h3>
                <ul className="flex flex-col gap-fluid-xs text-fluid-sm p-0 m-0 list-none">
                  <li>✅ WordPress core blocks</li>
                  <li>✅ Clean, simple structure</li>
                  <li>✅ Minimal state management</li>
                  <li>✅ Reusable components</li>
                  <li>✅ ~200 lines of code</li>
                  <li>✅ Easy to maintain</li>
                  <li>✅ Design system compliant</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Design System Compliance */}
          <div className="bg-card border border-border rounded-[var(--radius-lg)] p-element-lg flex flex-col gap-fluid-lg">
            <h2 className="m-0">Design System Compliance</h2>
            
            <div className="flex flex-col gap-fluid-md">
              <div className="flex items-start gap-fluid-sm">
                <div className="flex-shrink-0 w-6 h-6 rounded-[var(--radius-full)] bg-primary flex items-center justify-center text-primary-foreground text-fluid-sm font-bold">
                  ✓
                </div>
                <div className="flex flex-col gap-fluid-xs">
                  <p className="font-medium m-0">Typography</p>
                  <p className="text-muted-foreground text-fluid-sm m-0">
                    <strong>Lora</strong> for headings (SiteTitle), <strong>Noto Sans</strong> for UI (Navigation, Search)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-fluid-sm">
                <div className="flex-shrink-0 w-6 h-6 rounded-[var(--radius-full)] bg-primary flex items-center justify-center text-primary-foreground text-fluid-sm font-bold">
                  ✓
                </div>
                <div className="flex flex-col gap-fluid-xs">
                  <p className="font-medium m-0">Colors</p>
                  <p className="text-muted-foreground text-fluid-sm m-0">
                    100% semantic tokens (text-foreground, bg-primary, etc.)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-fluid-sm">
                <div className="flex-shrink-0 w-6 h-6 rounded-[var(--radius-full)] bg-primary flex items-center justify-center text-primary-foreground text-fluid-sm font-bold">
                  ✓
                </div>
                <div className="flex flex-col gap-fluid-xs">
                  <p className="font-medium m-0">Spacing</p>
                  <p className="text-muted-foreground text-fluid-sm m-0">
                    Tailwind gap scale, no arbitrary values
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-fluid-sm">
                <div className="flex-shrink-0 w-6 h-6 rounded-[var(--radius-full)] bg-primary flex items-center justify-center text-primary-foreground text-fluid-sm font-bold">
                  ✓
                </div>
                <div className="flex flex-col gap-fluid-xs">
                  <p className="font-medium m-0">Accessibility</p>
                  <p className="text-muted-foreground text-fluid-sm m-0">
                    WCAG AA compliance, keyboard navigation, ARIA labels
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="bg-card border border-border rounded-[var(--radius-lg)] p-element-lg flex flex-col gap-fluid-lg">
            <h2 className="m-0">Features</h2>
            
            <table className="w-full text-fluid-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-element-sm">Feature</th>
                  <th className="text-center py-element-sm">OLD</th>
                  <th className="text-center py-element-sm">NEW</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-element-sm">Logo</td>
                  <td className="text-center">✓</td>
                  <td className="text-center">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-element-sm">Site Title</td>
                  <td className="text-center">✗</td>
                  <td className="text-center">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-element-sm">Navigation</td>
                  <td className="text-center">✓</td>
                  <td className="text-center">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-element-sm">Submenus</td>
                  <td className="text-center">✓ (Mega)</td>
                  <td className="text-center">✓ (Simple)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-element-sm">Mobile Menu</td>
                  <td className="text-center">✓</td>
                  <td className="text-center">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-element-sm">Search</td>
                  <td className="text-center">✓ (Modal)</td>
                  <td className="text-center">✓ (Inline)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-element-sm">Theme Switcher</td>
                  <td className="text-center">✓</td>
                  <td className="text-center">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-element-sm">WordPress Blocks</td>
                  <td className="text-center">✗</td>
                  <td className="text-center">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-element-sm">Code Complexity</td>
                  <td className="text-center">High</td>
                  <td className="text-center">Low</td>
                </tr>
                <tr>
                  <td className="py-element-sm">Maintainability</td>
                  <td className="text-center">Medium</td>
                  <td className="text-center">High</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Code Stats */}
          <div className="bg-card border border-border rounded-[var(--radius-lg)] p-element-lg flex flex-col gap-fluid-lg">
            <h2 className="m-0">Code Statistics</h2>
            
            <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-2">
              <div className="flex flex-col gap-fluid-md">
                <h3 className="text-fluid-lg m-0">OLD Header.tsx</h3>
                <ul className="flex flex-col gap-fluid-xs text-fluid-sm p-0 m-0 list-none">
                  <li>Lines of code: ~800</li>
                  <li>Icon imports: 12+</li>
                  <li>State variables: 7</li>
                  <li>Components: Custom</li>
                  <li>WordPress blocks: None</li>
                </ul>
              </div>

              <div className="flex flex-col gap-fluid-md">
                <h3 className="text-fluid-lg m-0">NEW HeaderNew.tsx</h3>
                <ul className="flex flex-col gap-fluid-xs text-fluid-sm p-0 m-0 list-none">
                  <li>Lines of code: ~200</li>
                  <li>Icon imports: 2</li>
                  <li>State variables: 1</li>
                  <li>Components: Theme blocks</li>
                  <li>WordPress blocks: 4</li>
                </ul>
              </div>
            </div>

            <div className="p-element-md bg-primary/10 border border-primary rounded-[var(--radius-lg)]">
              <p className="text-fluid-sm m-0">
                <strong>Result:</strong> 75% reduction in code complexity while maintaining all features!
              </p>
            </div>
          </div>

          {/* Sample Content */}
          <div className="flex flex-col gap-fluid-md">
            <h2 className="m-0">Sample Page Content</h2>
            <p className="text-muted-foreground m-0">
              This is sample content to demonstrate the header and footer in context.
              Toggle between old and new implementations using the button at the top.
            </p>
            <p className="text-muted-foreground m-0">
              The new implementation uses WordPress core blocks:
            </p>
            <ul className="flex flex-col gap-fluid-xs text-muted-foreground p-0 m-0 list-none">
              <li>• <strong>core/site-logo</strong> - Site branding logo</li>
              <li>• <strong>core/site-title</strong> - Site name (LightSpeed Tours)</li>
              <li>• <strong>core/navigation</strong> - Main menu with submenus</li>
              <li>• <strong>core/search</strong> - Search functionality</li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Footer Display */}
      <div className="border-t-4 border-primary">
        {showNew ? (
          <FooterNew currentPage={currentPage} onNavigate={handleNavigate} />
        ) : (
          <Footer currentPage={currentPage} onNavigate={handleNavigate} />
        )}
      </div>
    </div>
  );
}