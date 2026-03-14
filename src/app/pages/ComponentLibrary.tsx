/**
 * Component Library Catalog
 * 
 * A comprehensive showcase of all available components in the design system.
 * Shows implementation examples, variants, and usage guidelines.
 * 
 * @module ComponentLibrary
 * @category pages
 */

import { Container } from "../components/common/Container";
import { FeatureCard } from "../components/patterns/FeatureCard";
import { 
  Palette, 
  TextT as Type, 
  Layout, 
  Package as Box,
  Circle,
  Square,
  Lightning as Zap,
  Shield,
  Heart,
  CheckCircle as CircleCheck,
  WarningCircle as AlertCircle,
  Info,
  Warning as AlertTriangle,
  Star,
  ArrowRight
} from "@phosphor-icons/react";

export function ComponentLibrary() {
  return (
    <main className="min-h-screen py-12">
      <Container>
        {/* Header */}
        <div className="text-center pb-16 flex flex-col items-center gap-4">
          <div className="wp-badge">
            <Box className="w-4 h-4" />
            <span>Component Library</span>
          </div>
          <h1>Available Components</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            All components use CSS variables from the design system. 
            Fully customizable by editing theme files.
          </p>
        </div>

        {/* Buttons Section */}
        <section className="pb-16 flex flex-col gap-6">
          <h2>Buttons</h2>
          <p className="text-muted-foreground">
            Location: <code className="wp-code">/src/styles/components/button.css</code>
          </p>

          <div className="wp-component-showcase">
            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <button className="button button--primary">Primary</button>
                <button className="button button--secondary">Secondary</button>
                <button className="button button--outline">Outline</button>
                <button className="button button--ghost">Ghost</button>
                <button className="button button--destructive">Destructive</button>
              </div>
            </div>

            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <button className="button button--primary button--sm">Small</button>
                <button className="button button--primary">Default</button>
                <button className="button button--primary button--lg">Large</button>
              </div>
            </div>

            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">With Icons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="button button--primary">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="button button--outline">
                  <Star className="w-5 h-5" />
                  Favorite
                </button>
              </div>
            </div>

            <div className="wp-component-showcase__code">
              <pre><code>{`<button className="button button--primary">
  Primary
</button>

<button className="button button--outline button--lg">
  Large Outline
</button>

<button className="button button--primary">
  <span>With Icon</span>
  <ArrowRight className="w-5 h-5" />
</button>`}</code></pre>
            </div>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="pb-16 flex flex-col gap-6">
          <h2>Form Elements</h2>
          <p className="text-muted-foreground">
            Location: <code className="wp-code">/src/styles/components/form.css</code>
          </p>

          <div className="wp-component-showcase">
            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Inputs</h3>
              <div className="flex flex-col gap-4 max-w-md">
                <div>
                  <label className="wp-form-label">Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="wp-form-input"
                  />
                </div>
                <div>
                  <label className="wp-form-label">
                    Password
                    <span className="wp-form-label-required">*</span>
                  </label>
                  <input 
                    type="password" 
                    placeholder="Enter password"
                    className="wp-form-input"
                  />
                  <p className="wp-form-help">Must be at least 8 characters</p>
                </div>
                <div>
                  <label className="wp-form-label">Disabled</label>
                  <input 
                    type="text" 
                    placeholder="Disabled input"
                    disabled
                    className="wp-form-input"
                  />
                </div>
                <div>
                  <label className="wp-form-label">Error State</label>
                  <input 
                    type="text" 
                    placeholder="Invalid input"
                    className="wp-form-input wp-form-input--error"
                  />
                  <p className="wp-form-error">This field is required</p>
                </div>
              </div>
            </div>

            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Textarea & Select</h3>
              <div className="flex flex-col gap-4 max-w-md">
                <div>
                  <label className="wp-form-label">Message</label>
                  <textarea 
                    placeholder="Enter your message"
                    rows={4}
                    className="wp-form-textarea"
                  />
                </div>
                <div>
                  <label className="wp-form-label">Country</label>
                  <select className="wp-form-select">
                    <option>Select a country</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Checkboxes & Radio</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="wp-form-checkbox">
                    <input type="checkbox" />
                    <span>Accept terms and conditions</span>
                  </label>
                  <label className="wp-form-checkbox">
                    <input type="checkbox" checked readOnly />
                    <span>Receive marketing emails</span>
                  </label>
                  <label className="wp-form-checkbox">
                    <input type="checkbox" disabled />
                    <span>Disabled option</span>
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="wp-form-radio">
                    <input type="radio" name="plan" />
                    <span>Free plan</span>
                  </label>
                  <label className="wp-form-radio">
                    <input type="radio" name="plan" checked readOnly />
                    <span>Pro plan</span>
                  </label>
                  <label className="wp-form-radio">
                    <input type="radio" name="plan" disabled />
                    <span>Enterprise plan (coming soon)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="wp-component-showcase__code">
              <pre><code>{`<label className="wp-form-label">Email</label>
<input 
  type="email" 
  className="wp-form-input"
  placeholder="Enter email"
/>

<textarea 
  className="wp-form-textarea"
  rows={4}
/>

<select className="wp-form-select">
  <option>Choose option</option>
</select>

<label className="wp-form-checkbox">
  <input type="checkbox" />
  <span>Label text</span>
</label>`}</code></pre>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="pb-16 flex flex-col gap-6">
          <h2>Cards</h2>
          <p className="text-muted-foreground">
            Location: <code className="wp-code">/src/styles/components/card.css</code>
          </p>

          <div className="wp-component-showcase">
            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Basic Cards</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="wp-card">
                  <div className="wp-card__header">
                    <h3 className="wp-card__title">Card Title</h3>
                  </div>
                  <div className="wp-card__content">
                    <p>This is a basic card with header and content sections.</p>
                  </div>
                </div>

                <div className="wp-card">
                  <div className="wp-card__content">
                    <h3 className="wp-card__title">No Header</h3>
                    <p>This card only has a content section.</p>
                  </div>
                  <div className="wp-card__footer">
                    <button className="button button--sm button--outline">Action</button>
                  </div>
                </div>

                <div className="wp-card wp-card--hover">
                  <div className="wp-card__content">
                    <h3 className="wp-card__title">Hover Effect</h3>
                    <p>This card has a hover effect enabled.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="wp-component-showcase__code">
              <pre><code>{`<div className="wp-card">
  <div className="wp-card__header">
    <h3 className="wp-card__title">Title</h3>
  </div>
  <div className="wp-card__content">
    <p>Content here</p>
  </div>
  <div className="wp-card__footer">
    <button>Action</button>
  </div>
</div>`}</code></pre>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="pb-16 flex flex-col gap-6">
          <h2>Feature Cards</h2>
          <p className="text-muted-foreground">
            Location: <code className="wp-code">/src/app/components/patterns/FeatureCard.tsx</code>
          </p>

          <div className="wp-component-showcase">
            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Variants</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={Zap}
                  title="Default Variant"
                  description="This is the default feature card variant with card background."
                />
                <FeatureCard
                  icon={Shield}
                  title="Primary Variant"
                  description="This variant uses the primary color for emphasis."
                  variant="primary"
                />
                <FeatureCard
                  icon={Heart}
                  title="Accent Variant"
                  description="This variant uses the accent color for highlighting."
                  variant="accent"
                />
              </div>
            </div>

            <div className="wp-component-showcase__code">
              <pre><code>{`<FeatureCard
  icon={Zap}
  title="Feature Title"
  description="Feature description"
  variant="default" // or "primary" or "accent"
/>`}</code></pre>
            </div>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="pb-16 flex flex-col gap-6">
          <h2>Alerts</h2>
          <p className="text-muted-foreground">
            Location: <code className="wp-code">/src/styles/components/alert.css</code>
          </p>

          <div className="wp-component-showcase">
            <div className="wp-component-showcase__section">
              <div className="flex flex-col gap-4">
                <div className="wp-alert wp-alert--info">
                  <Info className="w-5 h-5" />
                  <div>
                    <h4 className="wp-alert__title">Information</h4>
                    <p className="wp-alert__description">This is an informational alert message.</p>
                  </div>
                </div>

                <div className="wp-alert wp-alert--success">
                  <CircleCheck className="w-5 h-5" />
                  <div>
                    <h4 className="wp-alert__title">Success</h4>
                    <p className="wp-alert__description">Your changes have been saved successfully.</p>
                  </div>
                </div>

                <div className="wp-alert wp-alert--warning">
                  <AlertTriangle className="w-5 h-5" />
                  <div>
                    <h4 className="wp-alert__title">Warning</h4>
                    <p className="wp-alert__description">Please review your input before continuing.</p>
                  </div>
                </div>

                <div className="wp-alert wp-alert--destructive">
                  <AlertCircle className="w-5 h-5" />
                  <div>
                    <h4 className="wp-alert__title">Error</h4>
                    <p className="wp-alert__description">An error occurred. Please try again.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="wp-component-showcase__code">
              <pre><code>{`<div className="wp-alert wp-alert--success">
  <CircleCheck className="w-5 h-5" />
  <div>
    <h4 className="wp-alert__title">Success</h4>
    <p className="wp-alert__description">Message</p>
  </div>
</div>`}</code></pre>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="pb-16 flex flex-col gap-6">
          <h2>Badges</h2>
          <p className="text-muted-foreground">
            Location: <code className="wp-code">/src/styles/components/badge.css</code>
          </p>

          <div className="wp-component-showcase">
            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <span className="wp-badge">Default</span>
                <span className="wp-badge wp-badge--primary">Primary</span>
                <span className="wp-badge wp-badge--secondary">Secondary</span>
                <span className="wp-badge wp-badge--success">Success</span>
                <span className="wp-badge wp-badge--warning">Warning</span>
                <span className="wp-badge wp-badge--destructive">Destructive</span>
                <span className="wp-badge wp-badge--outline">Outline</span>
              </div>
            </div>

            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">With Icons</h3>
              <div className="flex flex-wrap gap-3">
                <span className="wp-badge wp-badge--primary">
                  <Star className="w-3 h-3" />
                  <span>Featured</span>
                </span>
                <span className="wp-badge wp-badge--success">
                  <CircleCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>
            </div>

            <div className="wp-component-showcase__code">
              <pre><code>{`<span className="wp-badge">Default</span>
<span className="wp-badge wp-badge--primary">Primary</span>
<span className="wp-badge wp-badge--success">
  <CircleCheck className="w-3 h-3" />
  <span>Verified</span>
</span>`}</code></pre>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="pb-16 flex flex-col gap-6">
          <h2>Typography</h2>
          <p className="text-muted-foreground">
            All typography uses CSS variables. Only Lora (serif), Noto Sans (sans-serif), and Courier New (monospace) are allowed.
          </p>

          <div className="wp-component-showcase">
            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Headings</h3>
              <div className="flex flex-col gap-4">
                <h1>Heading 1 - Lora Bold 60px</h1>
                <h2>Heading 2 - Lora Semibold 36px</h2>
                <h3>Heading 3 - Lora Semibold 30px</h3>
                <h4>Heading 4 - Lora Medium 24px</h4>
                <h5>Heading 5 - Lora Medium 20px</h5>
                <h6>Heading 6 - Lora Medium 18px</h6>
              </div>
            </div>

            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Body Text</h3>
              <div className="flex flex-col gap-4 max-w-2xl">
                <p className="text-lg">Large paragraph - Noto Sans 18px</p>
                <p>Default paragraph - Noto Sans 16px. This is the standard body text size used throughout the application for optimal readability.</p>
                <p className="text-sm">Small text - Noto Sans 14px</p>
                <p className="text-xs">Extra small text - Noto Sans 12px</p>
              </div>
            </div>

            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Code</h3>
              <div className="flex flex-col gap-4">
                <p>Inline code: <code className="wp-code">const example = "code";</code></p>
                <pre className="wp-code-block"><code>{`function example() {
  return "Courier New monospace font";
}`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section className="pb-16 flex flex-col gap-6">
          <h2>Colors</h2>
          <p className="text-muted-foreground">
            All colors are CSS variables that automatically switch for dark mode.
          </p>

          <div className="wp-component-showcase">
            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="wp-color-swatch">
                  <div className="wp-color-swatch__color bg-primary"></div>
                  <div className="wp-color-swatch__label">Primary</div>
                </div>
                <div className="wp-color-swatch">
                  <div className="wp-color-swatch__color bg-secondary"></div>
                  <div className="wp-color-swatch__label">Secondary</div>
                </div>
                <div className="wp-color-swatch">
                  <div className="wp-color-swatch__color bg-accent"></div>
                  <div className="wp-color-swatch__label">Accent</div>
                </div>
              </div>
            </div>

            <div className="wp-component-showcase__section">
              <h3 className="wp-component-showcase__label">Semantic Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="wp-color-swatch">
                  <div className="wp-color-swatch__color bg-success"></div>
                  <div className="wp-color-swatch__label">Success</div>
                </div>
                <div className="wp-color-swatch">
                  <div className="wp-color-swatch__color bg-warning"></div>
                  <div className="wp-color-swatch__label">Warning</div>
                </div>
                <div className="wp-color-swatch">
                  <div className="wp-color-swatch__color bg-destructive"></div>
                  <div className="wp-color-swatch__label">Destructive</div>
                </div>
                <div className="wp-color-swatch">
                  <div className="wp-color-swatch__color bg-info"></div>
                  <div className="wp-color-swatch__label">Info</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Links */}
        <section className="pt-16 p-8 bg-muted/50 rounded-lg flex flex-col gap-6">
          <h2 className="text-center">Learn More</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="wp-doc-link">
              <div className="wp-doc-link__icon">
                <Type className="w-6 h-6" />
              </div>
              <h3 className="wp-doc-link__title">Component Guide</h3>
              <p className="wp-doc-link__description">
                Learn how to build new components
              </p>
            </div>
            <div className="wp-doc-link">
              <div className="wp-doc-link__icon">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="wp-doc-link__title">Design Tokens</h3>
              <p className="wp-doc-link__description">
                Complete CSS variables reference
              </p>
            </div>
            <div className="wp-doc-link">
              <div className="wp-doc-link__icon">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="wp-doc-link__title">Migration Guide</h3>
              <p className="wp-doc-link__description">
                Migrate existing components
              </p>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}

export default ComponentLibrary;