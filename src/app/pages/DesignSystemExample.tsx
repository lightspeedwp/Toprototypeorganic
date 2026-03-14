/**
 * Design System Example Page
 * 
 * A complete, production-ready page demonstrating:
 * - Proper use of CSS variables from design system
 * - Only defined fonts (Lora, Noto Sans, Courier New)
 * - BEM naming convention
 * - No hardcoded values
 * - Full dark mode support
 * - Real-world composition patterns
 * 
 * This page shows developers how to build pages that users can
 * fully customize by editing CSS files.
 * 
 * @module DesignSystemExample
 * @category pages
 */

import { Container } from "../components/common/Container";
import { FeatureCard } from "../components/patterns/FeatureCard";
import { 
  Lightning as Zap, 
  Shield, 
  Heart, 
  Palette, 
  Code, 
  Gear as Settings,
  CheckCircle as CircleCheck,
  ArrowRight,
  Star
} from "@phosphor-icons/react";

export function DesignSystemExample() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Primary Background */}
      <section className="wp-section-hero">
        <Container>
          <div className="text-center max-w-4xl py-20 flex flex-col items-center gap-6">
            <div className="wp-badge">
              <Star className="w-4 h-4" />
              <span>100% Customizable via CSS</span>
            </div>
            
            <h1>
              Build Beautiful Sites with Your Design System
            </h1>
            
            <p className="text-xl text-primary-foreground/90 max-w-2xl">
              Every component uses CSS variables. Change colors, fonts, and spacing 
              by editing just 3 CSS files. No React code changes needed.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="button button--secondary button--lg">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="button button--outline button--lg wp-button-outline-on-primary">
                View Documentation
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center flex flex-col gap-4 pb-12 items-center">
            <h2>Why Use Our Design System?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Built with flexibility and user customization in mind. 
              All styling is controlled through CSS variables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Palette}
              title="Fully Customizable"
              description="Edit 3 CSS files to change the entire site. Colors, fonts, spacing - all via CSS variables."
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Optimized for performance with minimal CSS and automatic dark mode support."
              variant="primary"
            />
            <FeatureCard
              icon={Shield}
              title="Production Ready"
              description="WCAG AA accessible, responsive, and tested across all modern browsers."
            />
            <FeatureCard
              icon={Code}
              title="Clean Code"
              description="BEM naming, semantic HTML, no inline styles. Easy to maintain and extend."
            />
            <FeatureCard
              icon={Heart}
              title="Developer Friendly"
              description="Clear documentation, templates, and examples. Get started in minutes."
              variant="accent"
            />
            <FeatureCard
              icon={Settings}
              title="Dark Mode Built-in"
              description="Automatic dark mode via CSS variables. No dark: classes needed."
            />
          </div>
        </Container>
      </section>

      {/* Stats Section - Muted Background */}
      <section className="wp-section-stats">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="wp-stat-number">100%</div>
              <div className="wp-stat-label">CSS Variables</div>
            </div>
            <div>
              <div className="wp-stat-number">3</div>
              <div className="wp-stat-label">Font Families</div>
            </div>
            <div>
              <div className="wp-stat-number">0</div>
              <div className="wp-stat-label">Hardcoded Values</div>
            </div>
            <div>
              <div className="wp-stat-number">∞</div>
              <div className="wp-stat-label">Customization Options</div>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center flex flex-col gap-4 pb-12 items-center">
            <h2>How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Three simple files control your entire site design.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="wp-how-it-works-card">
              <div className="wp-how-it-works-card__number">1</div>
              <h3 className="wp-how-it-works-card__title">theme-light.css</h3>
              <p className="wp-how-it-works-card__description">
                Define light mode colors. Primary, secondary, accent, semantic colors, 
                backgrounds, borders, and more.
              </p>
              <div className="wp-code-example">
                <code>--primary: #4a7311;</code>
              </div>
            </div>

            <div className="wp-how-it-works-card">
              <div className="wp-how-it-works-card__number">2</div>
              <h3 className="wp-how-it-works-card__title">theme-dark.css</h3>
              <p className="wp-how-it-works-card__description">
                Define dark mode colors. Same structure as light mode, 
                automatically switches with .dark class.
              </p>
              <div className="wp-code-example">
                <code>--primary: #90ba48;</code>
              </div>
            </div>

            <div className="wp-how-it-works-card">
              <div className="wp-how-it-works-card__number">3</div>
              <h3 className="wp-how-it-works-card__title">theme.css</h3>
              <p className="wp-how-it-works-card__description">
                Define typography, spacing, radius, and shadows. Fluid, responsive 
                values that adapt to viewport size.
              </p>
              <div className="wp-code-example">
                <code>--text-base: 16px;</code>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features List Section - Accent Background */}
      <section className="wp-section-features-list">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="pb-6">Everything You Need</h2>
              <ul className="flex flex-col gap-4">
                <li className="wp-feature-list-item">
                  <CircleCheck className="w-5 h-5 text-success flex-shrink-0" />
                  <span>All colors via CSS variables</span>
                </li>
                <li className="wp-feature-list-item">
                  <CircleCheck className="w-5 h-5 text-success flex-shrink-0" />
                  <span>Only 3 font families (Lora, Noto Sans, Courier New)</span>
                </li>
                <li className="wp-feature-list-item">
                  <CircleCheck className="w-5 h-5 text-success flex-shrink-0" />
                  <span>BEM naming convention throughout</span>
                </li>
                <li className="wp-feature-list-item">
                  <CircleCheck className="w-5 h-5 text-success flex-shrink-0" />
                  <span>No inline styles anywhere</span>
                </li>
                <li className="wp-feature-list-item">
                  <CircleCheck className="w-5 h-5 text-success flex-shrink-0" />
                  <span>Automatic dark mode (no dark: classes)</span>
                </li>
                <li className="wp-feature-list-item">
                  <CircleCheck className="w-5 h-5 text-success flex-shrink-0" />
                  <span>Fluid spacing and typography</span>
                </li>
                <li className="wp-feature-list-item">
                  <CircleCheck className="w-5 h-5 text-success flex-shrink-0" />
                  <span>WCAG AA accessible</span>
                </li>
                <li className="wp-feature-list-item">
                  <CircleCheck className="w-5 h-5 text-success flex-shrink-0" />
                  <span>Complete documentation</span>
                </li>
              </ul>
            </div>

            <div className="wp-code-showcase">
              <div className="wp-code-showcase__header">
                <div className="flex gap-2">
                  <div className="wp-code-showcase__dot"></div>
                  <div className="wp-code-showcase__dot"></div>
                  <div className="wp-code-showcase__dot"></div>
                </div>
                <span className="text-xs text-muted-foreground">theme-light.css</span>
              </div>
              <div className="wp-code-showcase__content">
                <pre className="text-sm"><code>{`/* Edit these values to customize */
:root {
  --primary: #4a7311;
  --secondary: #2c5f2d;
  --accent: #97bc62;
  
  --text-base: 16px;
  --font-family-lora: "Lora", serif;
  --font-family-noto-sans: "Noto Sans", sans-serif;
  
  --spacing-section-md: clamp(3rem, 6vw, 5rem);
  --radius-lg: calc(var(--radius) + 2px);
}`}</code></pre>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="wp-cta-box flex flex-col items-center gap-4">
            <h2>Ready to Get Started?</h2>
            <p className="text-lg max-w-2xl">
              View the complete design system showcase or read the documentation 
              to learn how to build your own components.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="button button--primary button--lg">
                View Showcase
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="button button--outline button--lg">
                Read Documentation
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonial Section - Card Background */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container>
          <div className="max-w-3xl">
            <div className="wp-testimonial">
              <div className="wp-testimonial__quote">
                "I changed the primary color in theme-light.css and the entire site 
                updated instantly. No React code changes, no rebuilding components. 
                This is exactly what I needed for rapid client customization."
              </div>
              <div className="wp-testimonial__author">
                <div className="wp-testimonial__avatar">
                  <span>DS</span>
                </div>
                <div>
                  <div className="wp-testimonial__name">Design System User</div>
                  <div className="wp-testimonial__title">Frontend Developer</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

// Default export for React Router lazy loading
export default DesignSystemExample;