/**
 * Design System Showcase Page
 * 
 * Demonstrates all design system tokens in use:
 * - Colors (from theme-light.css and theme-dark.css)
 * - Typography (Lora, Noto Sans, Courier New)
 * - Spacing (fluid section tokens)
 * - Borders and radius
 * - Component patterns
 * 
 * This page shows developers how to use CSS variables correctly
 * and allows users to verify customization by editing CSS files.
 * 
 * UPDATED: March 2026 - Added StatsDisplay component, migrated to Phosphor Icons
 * 
 * @module DesignSystemShowcase
 * @category pages
 */

import { Container } from "../components/common/Container";
import { StatsDisplay } from "../components/common/StatsDisplay";
import { getStatsForContext } from "../data/stats";
import * as PhosphorIcons from "@phosphor-icons/react";

export function DesignSystemShowcase() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="wp-pattern-section wp-pattern-section--primary">
        <Container>
          <div className="text-center py-16">
            <h1 className="mb-4">Design System Showcase</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All components use CSS variables from your design system. 
              Customize the entire site by editing <code className="bg-muted px-2 py-1 rounded text-sm">theme-light.css</code> and <code className="bg-muted px-2 py-1 rounded text-sm">theme-dark.css</code>.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-6 z-10 pb-12">
        <StatsDisplay
          stats={[
            { value: "120", label: "CSS Variables", description: "Design tokens", icon: "Sliders" },
            { value: "34", label: "Colors", description: "Semantic tokens", icon: "Palette" },
            { value: "3", label: "Font Families", description: "Lora, Noto Sans, Courier", icon: "TextT" },
            { value: "24", label: "Spacing", description: "Fluid scale", icon: "Ruler" },
          ]}
          columns={{ mobile: 2, tablet: 2, desktop: 4 }}
          useContainer={true}
        />
      </section>

      {/* Color Palette Section */}
      <section className="py-16">
        <Container>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <PhosphorIcons.Palette className="w-6 h-6 text-primary" />
              <h2>Color Palette</h2>
            </div>
            <p className="text-muted-foreground">
              All colors use CSS variables. Edit <code className="bg-muted px-2 py-1 rounded text-sm">theme-light.css</code> or <code className="bg-muted px-2 py-1 rounded text-sm">theme-dark.css</code> to customize.
            </p>
          </div>

          {/* Primary Colors */}
          <div className="grid gap-8 mb-12">
            <div>
              <h3 className="mb-4">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch
                  name="Primary"
                  variable="--primary"
                  bgClass="bg-primary"
                  textClass="text-primary-foreground"
                  description="Main brand color"
                />
                <ColorSwatch
                  name="Secondary"
                  variable="--secondary"
                  bgClass="bg-secondary"
                  textClass="text-secondary-foreground"
                  description="Secondary actions"
                />
                <ColorSwatch
                  name="Accent"
                  variable="--accent"
                  bgClass="bg-accent"
                  textClass="text-accent-foreground"
                  description="Highlights & hover"
                />
                <ColorSwatch
                  name="Muted"
                  variable="--muted"
                  bgClass="bg-muted"
                  textClass="text-muted-foreground"
                  description="Subtle backgrounds"
                />
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <h3 className="mb-4">Semantic Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch
                  name="Success"
                  variable="--success"
                  bgClass="bg-success"
                  textClass="text-success-foreground"
                  description="Success states"
                />
                <ColorSwatch
                  name="Warning"
                  variable="--warning"
                  bgClass="bg-warning"
                  textClass="text-warning-foreground"
                  description="Warning states"
                />
                <ColorSwatch
                  name="Destructive"
                  variable="--destructive"
                  bgClass="bg-destructive"
                  textClass="text-destructive-foreground"
                  description="Error states"
                />
                <ColorSwatch
                  name="Info"
                  variable="--info"
                  bgClass="bg-info"
                  textClass="text-info-foreground"
                  description="Info messages"
                />
              </div>
            </div>

            {/* Background Colors */}
            <div>
              <h3 className="mb-4">Background Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <ColorSwatch
                  name="Background"
                  variable="--background"
                  bgClass="bg-background"
                  textClass="text-foreground"
                  description="Page background"
                  border
                />
                <ColorSwatch
                  name="Card"
                  variable="--card"
                  bgClass="bg-card"
                  textClass="text-card-foreground"
                  description="Card background"
                  border
                />
                <ColorSwatch
                  name="Popover"
                  variable="--popover"
                  bgClass="bg-popover"
                  textClass="text-popover-foreground"
                  description="Popover background"
                  border
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Typography Section */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <PhosphorIcons.TextT className="w-6 h-6 text-primary" />
              <h2>Typography Scale</h2>
            </div>
            <p className="text-muted-foreground">
              Only 3 font families: <strong>Lora</strong> (serif headings), <strong>Noto Sans</strong> (sans-serif body), <strong>Courier New</strong> (monospace code).
            </p>
          </div>

          {/* Headings */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-6">
                Headings use <code className="bg-muted px-2 py-1 rounded">font-family: var(--font-family-lora)</code>
              </p>
              <div className="space-y-4">
                <div>
                  <h1 className="mb-2">Heading 1</h1>
                  <p className="text-xs text-muted-foreground font-mono">
                    var(--text-6xl) • var(--font-weight-bold) • Lora
                  </p>
                </div>
                <div>
                  <h2 className="mb-2">Heading 2</h2>
                  <p className="text-xs text-muted-foreground font-mono">
                    var(--text-4xl) • var(--font-weight-semibold) • Lora
                  </p>
                </div>
                <div>
                  <h3 className="mb-2">Heading 3</h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    var(--text-3xl) • var(--font-weight-semibold) • Lora
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">Heading 4</h4>
                  <p className="text-xs text-muted-foreground font-mono">
                    var(--text-2xl) • var(--font-weight-medium) • Lora
                  </p>
                </div>
                <div>
                  <h5 className="mb-2">Heading 5</h5>
                  <p className="text-xs text-muted-foreground font-mono">
                    var(--text-xl) • var(--font-weight-medium) • Lora
                  </p>
                </div>
                <div>
                  <h6 className="mb-2">Heading 6</h6>
                  <p className="text-xs text-muted-foreground font-mono">
                    var(--text-lg) • var(--font-weight-medium) • Lora
                  </p>
                </div>
              </div>
            </div>

            {/* Body Text */}
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-6">
                Body text uses <code className="bg-muted px-2 py-1 rounded">font-family: var(--font-family-noto-sans)</code>
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-base mb-2">
                    Base text (16px) - This is the default body text size used throughout the site for paragraphs and content.
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    var(--text-base) • var(--font-weight-normal) • Noto Sans
                  </p>
                </div>
                <div>
                  <p className="text-sm mb-2">
                    Small text (14px) - Used for captions, labels, and secondary information.
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    var(--text-sm) • var(--font-weight-normal) • Noto Sans
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-2">
                    Extra small text (12px) - Used for fine print and metadata.
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    var(--text-xs) • var(--font-weight-normal) • Noto Sans
                  </p>
                </div>
              </div>
            </div>

            {/* Code */}
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-6">
                Code uses <code className="bg-muted px-2 py-1 rounded">font-family: var(--font-family-mono)</code>
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="font-mono text-sm">
{`// Example code block
const theme = {
  colors: 'var(--primary)',
  fonts: 'var(--font-family-noto-sans)',
  spacing: 'var(--spacing-section-md)'
};`}
                </code>
              </pre>
            </div>
          </div>
        </Container>
      </section>

      {/* Spacing Section */}
      <section className="py-16">
        <Container>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <PhosphorIcons.Ruler className="w-6 h-6 text-primary" />
              <h2>Spacing Scale</h2>
            </div>
            <p className="text-muted-foreground">
              Fluid spacing tokens adapt to viewport size using <code className="bg-muted px-2 py-1 rounded">clamp()</code> for responsive layouts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Section Spacing */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Section Spacing</h3>
              <div className="space-y-4">
                <SpacingDemo
                  label="Small"
                  variable="--spacing-section-sm"
                  height="h-16"
                />
                <SpacingDemo
                  label="Medium"
                  variable="--spacing-section-md"
                  height="h-24"
                />
                <SpacingDemo
                  label="Large"
                  variable="--spacing-section-lg"
                  height="h-32"
                />
              </div>
            </div>

            {/* Gap Spacing */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Gap Spacing</h3>
              <div className="space-y-4">
                <SpacingDemo
                  label="Small"
                  variable="--spacing-gap-sm"
                  height="h-12"
                />
                <SpacingDemo
                  label="Medium"
                  variable="--spacing-gap-md"
                  height="h-16"
                />
                <SpacingDemo
                  label="Large"
                  variable="--spacing-gap-lg"
                  height="h-20"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Border Radius Section */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <PhosphorIcons.Circle className="w-6 h-6 text-primary" />
              <h2>Border Radius Scale</h2>
            </div>
            <p className="text-muted-foreground">
              Consistent border radius using <code className="bg-muted px-2 py-1 rounded">var(--radius)</code> as base value.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <RadiusDemo label="Small" variable="--radius-sm" className="rounded-sm" />
            <RadiusDemo label="Medium" variable="--radius-md" className="rounded-md" />
            <RadiusDemo label="Large" variable="--radius-lg" className="rounded-lg" />
            <RadiusDemo label="Extra Large" variable="--radius-xl" className="rounded-xl" />
          </div>
        </Container>
      </section>

      {/* Component Examples */}
      <section className="py-16">
        <Container>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <PhosphorIcons.Check className="w-6 h-6 text-primary" />
              <h2>Component Examples</h2>
            </div>
            <p className="text-muted-foreground">
              All components automatically use design system tokens via Tailwind utilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <button className="button button--primary">
                  Primary Button
                </button>
                <button className="button button--secondary">
                  Secondary Button
                </button>
                <button className="button button--outline">
                  Outline Button
                </button>
                <button className="button button--ghost">
                  Ghost Button
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Uses <code className="bg-muted px-1 rounded">var(--primary)</code>, <code className="bg-muted px-1 rounded">var(--secondary)</code>, etc.
              </p>
            </div>

            {/* Cards */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Cards</h3>
              <div className="wp-block-card">
                <div className="card__header">
                  <h4 className="card__title">Card Title</h4>
                  <p className="card__description">Card description text</p>
                </div>
                <div className="card__content">
                  <p className="text-sm">
                    Card content uses <code className="bg-muted px-1 rounded">var(--card)</code> and <code className="bg-muted px-1 rounded">var(--card-foreground)</code>.
                  </p>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Semantic Alerts</h3>
              <div className="space-y-3">
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <PhosphorIcons.Check className="w-4 h-4 text-success" />
                    <p className="text-sm font-medium text-success-foreground">
                      Success message
                    </p>
                  </div>
                </div>
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <PhosphorIcons.Info className="w-4 h-4 text-warning" />
                    <p className="text-sm font-medium text-warning-foreground">
                      Warning message
                    </p>
                  </div>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <PhosphorIcons.Info className="w-4 h-4 text-destructive" />
                    <p className="text-sm font-medium text-destructive-foreground">
                      Error message
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Elements */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="mb-4">Form Elements</h3>
              <div className="space-y-4">
                <div>
                  <label className="form__label">Input Field</label>
                  <input
                    type="text"
                    placeholder="Enter text..."
                    className="form__input"
                  />
                </div>
                <div>
                  <label className="form__label">Textarea</label>
                  <textarea
                    placeholder="Enter description..."
                    className="form__textarea"
                    rows={3}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Uses <code className="bg-muted px-1 rounded">var(--input-background)</code>, <code className="bg-muted px-1 rounded">var(--border)</code>, etc.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Customization Guide */}
      <section className="py-16 bg-primary/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">How to Customize</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Edit these 3 CSS files to customize the entire site:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="font-mono text-sm text-primary mb-2">theme-light.css</p>
                <p className="text-sm text-muted-foreground">Light mode colors</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="font-mono text-sm text-primary mb-2">theme-dark.css</p>
                <p className="text-sm text-muted-foreground">Dark mode colors</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="font-mono text-sm text-primary mb-2">theme.css</p>
                <p className="text-sm text-muted-foreground">Typography & spacing</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

/**
 * Color Swatch Component
 */
interface ColorSwatchProps {
  name: string;
  variable: string;
  bgClass: string;
  textClass: string;
  description: string;
  border?: boolean;
}

function ColorSwatch({ name, variable, bgClass, textClass, description, border }: ColorSwatchProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className={`${bgClass} ${textClass} rounded-md h-20 flex items-center justify-center mb-3 ${border ? 'border border-border' : ''}`}>
        <span className="font-medium text-sm">{name}</span>
      </div>
      <p className="text-sm font-medium mb-1">{name}</p>
      <p className="text-xs text-muted-foreground mb-2">{description}</p>
      <code className="text-xs font-mono text-primary">{variable}</code>
    </div>
  );
}

/**
 * Spacing Demo Component
 */
interface SpacingDemoProps {
  label: string;
  variable: string;
  height: string;
}

function SpacingDemo({ label, variable, height }: SpacingDemoProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <code className="text-xs font-mono text-muted-foreground">{variable}</code>
      </div>
      <div className={`${height} bg-primary/10 border-2 border-dashed border-primary/30 rounded`} />
    </div>
  );
}

/**
 * Radius Demo Component
 */
interface RadiusDemoProps {
  label: string;
  variable: string;
  className: string;
}

function RadiusDemo({ label, variable, className }: RadiusDemoProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className={`${className} bg-primary h-20 mb-3`} />
      <p className="text-sm font-medium mb-1">{label}</p>
      <code className="text-xs font-mono text-muted-foreground">{variable}</code>
    </div>
  );
}

// Default export for React Router lazy loading
export default DesignSystemShowcase;