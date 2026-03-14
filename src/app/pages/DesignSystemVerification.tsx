/**
 * Design System Verification Page
 * 
 * Comprehensive showcase of all CSS variables from the updated design system.
 * Demonstrates colors, typography, spacing, borders, radius, and shadows.
 * 
 * **Purpose:**
 * - Verify all CSS variables are working correctly
 * - Show color palette (light & dark mode)
 * - Demonstrate typography scale
 * - Display spacing tokens
 * - Showcase border radius and shadows
 * - Provide quick reference for developers
 * 
 * **Design System Requirements:**
 * - All styling uses CSS variables from /src/styles/global.css
 * - Typography: ONLY Lora (serif), Noto Sans (sans), Courier New (mono)
 * - Colors: Semantic tokens (bg-primary, text-foreground, etc.)
 * - Spacing: Fluid responsive via clamp() or Tailwind scale
 * - NO hardcoded values
 * - NO inline styles
 * - NO dark: classes
 */

import React from 'react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Check, Palette, TextT as Type, Ruler, Square, Sun, Moon } from '@phosphor-icons/react';

export default function DesignSystemVerification() {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background">
      <Container>
        {/* Breadcrumbs */}
        <div className="py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Developer Tools', href: '/dev-tools' },
              { label: 'Design System Verification', isCurrent: true }
            ]}
          />
        </div>
        
        {/* Page Header */}
        <header className="pb-12 text-center py-section-sm flex flex-col items-center gap-4">
          <h1>Design System Verification</h1>
          <p className="text-muted-foreground max-w-3xl">
            Comprehensive showcase of all CSS variables from your team's design system.
            All values are sourced from <code className="text-sm bg-muted px-2 py-1 rounded">/src/styles/global.css</code> and theme files.
          </p>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <>
                <Sun className="h-5 w-5" />
                <span className="font-sans font-medium">Switch to Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-5 w-5" />
                <span className="font-sans font-medium">Switch to Dark Mode</span>
              </>
            )}
          </button>
        </header>

        {/* Design System Compliance Badge */}
        <section className="pb-16">
          <div className="p-8 rounded-lg bg-card border-2 border-primary flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Check className="h-8 w-8 text-primary shrink-0" />
              <div className="flex flex-col gap-1">
                <h2>100% Design System Compliant</h2>
                <p className="text-muted-foreground">
                  All UI components use CSS variables exclusively. No hardcoded values.
                </p>
              </div>
            </div>
            
            <div className="wp-block-grid grid--cols-1 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded bg-muted flex flex-col gap-2">
                <h3>Typography</h3>
                <p className="text-sm text-muted-foreground">
                  3 font faces only:<br />
                  Lora, Noto Sans, Courier New
                </p>
              </div>
              <div className="p-4 rounded bg-muted flex flex-col gap-2">
                <h3>Colors</h3>
                <p className="text-sm text-muted-foreground">
                  Semantic tokens<br />
                  Auto dark mode
                </p>
              </div>
              <div className="p-4 rounded bg-muted flex flex-col gap-2">
                <h3>Spacing</h3>
                <p className="text-sm text-muted-foreground">
                  Fluid responsive<br />
                  via clamp()
                </p>
              </div>
              <div className="p-4 rounded bg-muted flex flex-col gap-2">
                <h3>Customizable</h3>
                <p className="text-sm text-muted-foreground">
                  Edit 3 CSS files<br />
                  No React changes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="pb-16 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Palette className="h-8 w-8 text-primary" />
            <div className="flex flex-col gap-1">
              <h2>Color Palette</h2>
              <p className="text-muted-foreground">
                Semantic color tokens that automatically adapt to light/dark mode
              </p>
            </div>
          </div>

          <div className="wp-block-grid grid--cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Background Colors */}
            <div className="p-6 rounded-lg bg-card border border-border flex flex-col gap-4">
              <h3>Background Colors</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-background border border-border"></div>
                  <div>
                    <p className="font-sans font-medium">Background</p>
                    <code className="text-xs text-muted-foreground">bg-background</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-card border border-border"></div>
                  <div>
                    <p className="font-sans font-medium">Card</p>
                    <code className="text-xs text-muted-foreground">bg-card</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-muted border border-border"></div>
                  <div>
                    <p className="font-sans font-medium">Muted</p>
                    <code className="text-xs text-muted-foreground">bg-muted</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Colors */}
            <div className="p-6 rounded-lg bg-card border border-border flex flex-col gap-4">
              <h3>Brand Colors</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-primary border border-border"></div>
                  <div>
                    <p className="font-sans font-medium">Primary</p>
                    <code className="text-xs text-muted-foreground">bg-primary</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-secondary border border-border"></div>
                  <div>
                    <p className="font-sans font-medium">Secondary</p>
                    <code className="text-xs text-muted-foreground">bg-secondary</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-accent border border-border"></div>
                  <div>
                    <p className="font-sans font-medium">Accent</p>
                    <code className="text-xs text-muted-foreground">bg-accent</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Semantic Colors */}
            <div className="p-6 rounded-lg bg-card border border-border flex flex-col gap-4">
              <h3>Semantic Colors</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-destructive border border-border"></div>
                  <div>
                    <p className="font-sans font-medium">Destructive</p>
                    <code className="text-xs text-muted-foreground">bg-destructive</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-success border border-border"></div>
                  <div>
                    <p className="font-sans font-medium">Success</p>
                    <code className="text-xs text-muted-foreground">bg-success</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-warning border border-border"></div>
                  <div>
                    <p className="font-sans font-medium">Warning</p>
                    <code className="text-xs text-muted-foreground">bg-warning</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Scale */}
        <section className="pb-16 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Type className="h-8 w-8 text-primary" />
            <div className="flex flex-col gap-1">
              <h2>Typography Scale</h2>
              <p className="text-muted-foreground">
                Three font families with fluid responsive sizing
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Headings (Lora) */}
            <div className="p-6 rounded-lg bg-card border border-border flex flex-col gap-4">
              <h3>Headings - Lora (Serif)</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <h1>Heading 1 - The quick brown fox</h1>
                  <code className="text-xs text-muted-foreground">
                    font-serif | var(--font-family-lora) | var(--text-6xl)
                  </code>
                </div>
                <div>
                  <h2>Heading 2 - The quick brown fox</h2>
                  <code className="text-xs text-muted-foreground">
                    font-serif | var(--font-family-lora) | var(--text-4xl)
                  </code>
                </div>
                <div>
                  <h3>Heading 3 - The quick brown fox</h3>
                  <code className="text-xs text-muted-foreground">
                    font-serif | var(--font-family-lora) | var(--text-3xl)
                  </code>
                </div>
                <div>
                  <h4>Heading 4 - The quick brown fox</h4>
                  <code className="text-xs text-muted-foreground">
                    font-serif | var(--font-family-lora) | var(--text-2xl)
                  </code>
                </div>
                <div>
                  <h5>Heading 5 - The quick brown fox</h5>
                  <code className="text-xs text-muted-foreground">
                    font-serif | var(--font-family-lora) | var(--text-xl)
                  </code>
                </div>
                <div>
                  <h6>Heading 6 - The quick brown fox</h6>
                  <code className="text-xs text-muted-foreground">
                    font-serif | var(--font-family-lora) | var(--text-lg)
                  </code>
                </div>
              </div>
            </div>

            {/* Body Text (Noto Sans) */}
            <div className="p-6 rounded-lg bg-card border border-border flex flex-col gap-4">
              <h3>Body Text - Noto Sans (Sans-Serif)</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-sans text-lg">
                    Large body text - The quick brown fox jumps over the lazy dog
                  </p>
                  <code className="text-xs text-muted-foreground">
                    font-sans | var(--font-family-noto-sans) | var(--text-lg)
                  </code>
                </div>
                <div>
                  <p className="font-sans">
                    Regular body text - The quick brown fox jumps over the lazy dog
                  </p>
                  <code className="text-xs text-muted-foreground">
                    font-sans | var(--font-family-noto-sans) | var(--text-base)
                  </code>
                </div>
                <div>
                  <p className="font-sans text-sm">
                    Small body text - The quick brown fox jumps over the lazy dog
                  </p>
                  <code className="text-xs text-muted-foreground">
                    font-sans | var(--font-family-noto-sans) | var(--text-sm)
                  </code>
                </div>
              </div>
            </div>

            {/* Code (Courier New) */}
            <div className="p-6 rounded-lg bg-card border border-border flex flex-col gap-4">
              <h3>Code - Courier New (Monospace)</h3>
              <div>
                <code className="font-mono block p-4 bg-muted rounded">
                  const greeting = "Hello, World!";<br />
                  console.log(greeting);
                </code>
                <code className="text-xs text-muted-foreground pt-2 block">
                  font-mono | var(--font-family-mono)
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing Scale */}
        <section className="pb-16 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Ruler className="h-8 w-8 text-primary" />
            <div className="flex flex-col gap-1">
              <h2>Spacing Scale</h2>
              <p className="text-muted-foreground">
                Fluid responsive spacing tokens using clamp()
              </p>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border flex flex-col gap-6">
            <h3>Section Spacing (Vertical)</h3>
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-4 pb-2">
                  <div className="h-16 bg-primary rounded w-2"></div>
                  <div>
                    <p className="font-sans font-medium">Small Section</p>
                    <code className="text-xs text-muted-foreground">
                      py-section-sm | var(--spacing-section-sm) | clamp(32px, 3vw, 48px)
                    </code>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 pb-2">
                  <div className="h-24 bg-primary rounded w-2"></div>
                  <div>
                    <p className="font-sans font-medium">Medium Section</p>
                    <code className="text-xs text-muted-foreground">
                      py-section-md | var(--spacing-section-md) | clamp(48px, 5vw, 96px)
                    </code>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 pb-2">
                  <div className="h-32 bg-primary rounded w-2"></div>
                  <div>
                    <p className="font-sans font-medium">Large Section</p>
                    <code className="text-xs text-muted-foreground">
                      py-section-lg | var(--spacing-section-lg) | clamp(64px, 8vw, 128px)
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="pb-16 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Square className="h-8 w-8 text-primary" />
            <div className="flex flex-col gap-1">
              <h2>Border Radius & Shadows</h2>
              <p className="text-muted-foreground">
                Consistent corner rounding and elevation
              </p>
            </div>
          </div>

          <div className="wp-block-grid grid--cols-1 md:grid-cols-2">
            {/* Border Radius */}
            <div className="p-6 rounded-lg bg-card border border-border flex flex-col gap-4">
              <h3>Border Radius</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-sm"></div>
                  <div>
                    <p className="font-sans font-medium">Small</p>
                    <code className="text-xs text-muted-foreground">rounded-sm | var(--radius-sm)</code>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded"></div>
                  <div>
                    <p className="font-sans font-medium">Default</p>
                    <code className="text-xs text-muted-foreground">rounded | var(--radius)</code>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-lg"></div>
                  <div>
                    <p className="font-sans font-medium">Large</p>
                    <code className="text-xs text-muted-foreground">rounded-lg | var(--radius-lg)</code>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-xl"></div>
                  <div>
                    <p className="font-sans font-medium">Extra Large</p>
                    <code className="text-xs text-muted-foreground">rounded-xl | var(--radius-xl)</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Shadows */}
            <div className="p-6 rounded-lg bg-card border border-border flex flex-col gap-4">
              <h3>Shadows (Elevation)</h3>
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-background rounded shadow-sm flex flex-col gap-1">
                  <p className="font-sans font-medium">Small Shadow</p>
                  <code className="text-xs text-muted-foreground">
                    shadow-sm | var(--elevation-sm)
                  </code>
                </div>
                <div className="p-4 bg-background rounded shadow flex flex-col gap-1">
                  <p className="font-sans font-medium">Default Shadow</p>
                  <code className="text-xs text-muted-foreground">
                    shadow | var(--elevation-md)
                  </code>
                </div>
                <div className="p-4 bg-background rounded shadow-lg flex flex-col gap-1">
                  <p className="font-sans font-medium">Large Shadow</p>
                  <code className="text-xs text-muted-foreground">
                    shadow-lg | var(--elevation-lg)
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customization Guide */}
        <section className="pb-16">
          <div className="p-8 rounded-lg bg-card border border-border flex flex-col gap-4">
            <h2>How to Customize</h2>
            <p className="text-muted-foreground">
              Users can customize the entire site by editing just 3 CSS files. No React changes needed!
            </p>
            
            <div className="wp-block-grid grid--cols-1 lg:grid-cols-3">
              <div className="p-4 rounded bg-muted flex flex-col gap-2">
                <h3>Light Mode</h3>
                <code className="text-xs block">/src/styles/theme-light.css</code>
                <p className="text-sm text-muted-foreground">
                  Edit color palette for light mode
                </p>
              </div>
              <div className="p-4 rounded bg-muted flex flex-col gap-2">
                <h3>Dark Mode</h3>
                <code className="text-xs block">/src/styles/theme-dark.css</code>
                <p className="text-sm text-muted-foreground">
                  Edit color palette for dark mode
                </p>
              </div>
              <div className="p-4 rounded bg-muted flex flex-col gap-2">
                <h3>Typography & Spacing</h3>
                <code className="text-xs block">/src/styles/theme.css</code>
                <p className="text-sm text-muted-foreground">
                  Edit fonts, sizes, spacing tokens
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center border-t border-border">
          <p className="text-muted-foreground">
            Design System Version 3.0 | Last Updated: February 27, 2026
          </p>
        </footer>
      </Container>
    </div>
  );
}