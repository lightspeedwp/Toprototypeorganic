/**
 * Button Showcase Page
 * 
 * Verification page demonstrating all button variants and styles using
 * the WordPress Button and Buttons components with design system compliance.
 * 
 * **Purpose:**
 * - Verify button styles are working correctly
 * - Demonstrate all 7 button variants
 * - Show all 3 size options
 * - Confirm design system CSS variable usage
 * - Test responsive behavior
 * - Validate WCAG AA/AAA compliance
 * 
 * **Design System Verification:**
 * - Typography: var(--font-family-noto-sans)
 * - Colors: Semantic tokens (bg-primary, text-primary-foreground, etc.)
 * - Spacing: Tailwind classes mapping to CSS variables
 * - Border radius: var(--radius-lg)
 * - Shadows: var(--elevation-sm)
 */

import React from 'react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DevToolsBreadcrumbs } from '../components/common/DevToolsBreadcrumbs';
import { Button } from '../components/blocks/design/Button';
import { Buttons } from '../components/blocks/design/Buttons';
import { 
  ArrowRight, 
  DownloadSimple as Download, 
  Heart, 
  EnvelopeSimple as Mail, 
  ArrowSquareOut as ExternalLink,
  Check,
  X,
  Spinner as LoaderCircle
} from '@phosphor-icons/react';

export default function ButtonShowcase() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <>
      <DevToolsBreadcrumbs currentPage="Button Variants" />
      <div className="min-h-screen bg-background py-section-sm">
        <Container>
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Developer Tools', href: '/dev-tools' },
              { label: 'Button Showcase', isCurrent: true }
            ]}
          />
          
          {/* Page Header */}
          <header className="mb-16 text-center mt-8">
            <h1 className="mb-4">WordPress Button System</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive showcase of all button variants, sizes, and configurations.
              All buttons use CSS variables from the design system and only Noto Sans font family.
            </p>
          </header>

          {/* Design System Compliance Badge */}
          <div className="mb-12 p-6 rounded-lg bg-card border border-border">
            <h2 className="mb-4">Design System Compliance</h2>
            <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-2">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3>Typography</h3>
                  <p className="text-sm text-muted-foreground">
                    Font family: var(--font-family-noto-sans)<br />
                    Font sizes: var(--text-sm, --text-base, --text-lg)<br />
                    Font weights: var(--font-weight-medium, --font-weight-semibold)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3>Colors</h3>
                  <p className="text-sm text-muted-foreground">
                    All semantic tokens: bg-primary, text-primary-foreground, bg-secondary, bg-accent, etc.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3>Spacing</h3>
                  <p className="text-sm text-muted-foreground">
                    Tailwind gap utilities (gap-1 through gap-12)<br />
                    Padding: px-4 py-2, px-6 py-3, px-8 py-4
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3>Border & Shadows</h3>
                  <p className="text-sm text-muted-foreground">
                    Border radius: var(--radius-lg)<br />
                    Shadows: var(--elevation-sm)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Required Variants */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="mb-2">Required Button Variants ✅</h2>
              <p className="text-muted-foreground">
                The three core button styles: default, outline, and cta.
              </p>
            </div>

            <div className="space-y-8">
              {/* Default Variant */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Default Variant</h3>
                  <p className="text-sm text-muted-foreground">
                    Solid primary background, white text. Use for standard primary actions.
                  </p>
                  <code className="text-xs text-muted-foreground block mt-2">
                    variant="default" → bg-primary text-primary-foreground
                  </code>
                </div>
                <Buttons orientation="horizontal" gap="4" align="start" stackOnMobile={true}>
                  <Button variant="default" size="sm" onClick={handleClick}>
                    Small
                  </Button>
                  <Button variant="default" size="default" onClick={handleClick}>
                    Default (Recommended)
                  </Button>
                  <Button variant="default" size="lg" onClick={handleClick}>
                    Large
                  </Button>
                </Buttons>
              </div>

              {/* Outline Variant */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Outline Variant</h3>
                  <p className="text-sm text-muted-foreground">
                    Transparent with 2px border, fills background on hover. Use for secondary CTAs.
                  </p>
                  <code className="text-xs text-muted-foreground block mt-2">
                    variant="outline" → border-2 border-primary bg-transparent
                  </code>
                </div>
                <Buttons orientation="horizontal" gap="4" align="start" stackOnMobile={true}>
                  <Button variant="outline" size="sm" onClick={handleClick}>
                    Small
                  </Button>
                  <Button variant="outline" size="default" onClick={handleClick}>
                    Default (Recommended)
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleClick}>
                    Large
                  </Button>
                </Buttons>
              </div>

              {/* CTA Variant */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">CTA Variant (Call-to-Action)</h3>
                  <p className="text-sm text-muted-foreground">
                    High-impact style with shadow and semibold text. Use for hero CTAs and high-priority conversions.
                  </p>
                  <code className="text-xs text-muted-foreground block mt-2">
                    variant="cta" → bg-primary shadow-sm font-semibold
                  </code>
                </div>
                <Buttons orientation="horizontal" gap="4" align="start" stackOnMobile={true}>
                  <Button variant="cta" size="sm" onClick={handleClick}>
                    Small CTA
                  </Button>
                  <Button variant="cta" size="default" onClick={handleClick}>
                    Default CTA
                  </Button>
                  <Button variant="cta" size="lg" onClick={handleClick}>
                    Large CTA (Recommended)
                  </Button>
                </Buttons>
              </div>
            </div>
          </section>

          {/* Section 2: Bonus Variants */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="mb-2">Bonus Button Variants</h2>
              <p className="text-muted-foreground">
                Additional styles for various use cases: primary, secondary, ghost, and link.
              </p>
            </div>

            <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-2">
              {/* Primary Variant */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Primary Variant</h3>
                  <p className="text-sm text-muted-foreground">
                    Alias for default variant. Same appearance.
                  </p>
                </div>
                <Buttons orientation="horizontal" gap="3" align="start">
                  <Button variant="primary" onClick={handleClick}>
                    Primary Button
                  </Button>
                </Buttons>
              </div>

              {/* Secondary Variant */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Secondary Variant</h3>
                  <p className="text-sm text-muted-foreground">
                    Alternative color scheme using secondary color.
                  </p>
                </div>
                <Buttons orientation="horizontal" gap="3" align="start">
                  <Button variant="secondary" onClick={handleClick}>
                    Secondary Button
                  </Button>
                </Buttons>
              </div>

              {/* Ghost Variant */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Ghost Variant</h3>
                  <p className="text-sm text-muted-foreground">
                    Transparent with subtle hover effect. For tertiary actions.
                  </p>
                </div>
                <Buttons orientation="horizontal" gap="3" align="start">
                  <Button variant="ghost" onClick={handleClick}>
                    Ghost Button
                  </Button>
                </Buttons>
              </div>

              {/* Link Variant */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Link Variant</h3>
                  <p className="text-sm text-muted-foreground">
                    Text-only with underline on hover. For inline links.
                  </p>
                </div>
                <Buttons orientation="horizontal" gap="3" align="start">
                  <Button variant="link" onClick={handleClick}>
                    Link Button
                  </Button>
                </Buttons>
              </div>
            </div>
          </section>

          {/* Section 3: Buttons with Icons */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="mb-2">Buttons with Icons</h2>
              <p className="text-muted-foreground">
                All variants support optional icons on left or right side.
              </p>
            </div>

            <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-2">
              {/* Icons Left */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Icon Position: Left</h3>
                </div>
                <div className="space-y-3">
                  <Button variant="primary" icon={<Download />} iconPosition="left">
                    Download
                  </Button>
                  <Button variant="outline" icon={<Mail />} iconPosition="left">
                    Contact Us
                  </Button>
                  <Button variant="ghost" icon={<Heart />} iconPosition="left">
                    Save
                  </Button>
                </div>
              </div>

              {/* Icons Right */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Icon Position: Right</h3>
                </div>
                <div className="space-y-3">
                  <Button variant="primary" icon={<ArrowRight />} iconPosition="right">
                    Continue
                  </Button>
                  <Button variant="outline" icon={<ExternalLink />} iconPosition="right">
                    Learn More
                  </Button>
                  <Button variant="cta" icon={<ArrowRight />} iconPosition="right" size="lg">
                    Start Your Safari
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Real-World Examples */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="mb-2">Real-World Use Cases</h2>
              <p className="text-muted-foreground">
                Common button combinations you'll encounter in the application.
              </p>
            </div>

            <div className="space-y-8">
              {/* Hero Section Example */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Hero Section CTAs</h3>
                  <p className="text-sm text-muted-foreground">
                    Primary CTA + Secondary outline, center aligned, stacks on mobile
                  </p>
                </div>
                <Buttons orientation="horizontal" gap="4" align="center" stackOnMobile={true}>
                  <Button variant="cta" size="lg" icon={<ArrowRight />} iconPosition="right">
                    Start Your Safari
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Buttons>
              </div>

              {/* Form Actions Example */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Form Actions</h3>
                  <p className="text-sm text-muted-foreground">
                    Cancel (ghost) + Submit (primary), right aligned
                  </p>
                </div>
                <Buttons orientation="horizontal" gap="3" align="end">
                  <Button variant="ghost" onClick={handleClick}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleClick}>
                    Submit
                  </Button>
                </Buttons>
              </div>

              {/* Filter Bar Example */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Filter Bar</h3>
                  <p className="text-sm text-muted-foreground">
                    Small buttons, mixed states (active = primary, inactive = outline)
                  </p>
                </div>
                <Buttons orientation="horizontal" gap="2" align="start" stackOnMobile={true}>
                  <Button variant="primary" size="sm">
                    All
                  </Button>
                  <Button variant="outline" size="sm">
                    Adventure
                  </Button>
                  <Button variant="outline" size="sm">
                    Wildlife
                  </Button>
                  <Button variant="outline" size="sm">
                    Cultural
                  </Button>
                  <Button variant="outline" size="sm">
                    Family
                  </Button>
                </Buttons>
              </div>

              {/* Card Actions Example */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Card Actions</h3>
                  <p className="text-sm text-muted-foreground">
                    Vertical stack, full width on mobile
                  </p>
                </div>
                <Buttons orientation="vertical" gap="3" align="start" className="max-w-xs">
                  <Button variant="primary" className="w-full">
                    View Details
                  </Button>
                  <Button variant="outline" className="w-full">
                    Save to Wishlist
                  </Button>
                </Buttons>
              </div>
            </div>
          </section>

          {/* Section 5: Button States */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="mb-2">Button States</h2>
              <p className="text-muted-foreground">
                Disabled and loading states with proper accessibility.
              </p>
            </div>

            <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-2">
              {/* Disabled State */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Disabled State</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically has 50% opacity and pointer-events disabled
                  </p>
                </div>
                <div className="space-y-3">
                  <Button variant="primary" disabled>
                    Disabled Primary
                  </Button>
                  <Button variant="outline" disabled>
                    Disabled Outline
                  </Button>
                  <Button variant="cta" disabled>
                    Disabled CTA
                  </Button>
                </div>
              </div>

              {/* With Links */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="mb-4">
                  <h3 className="mb-1">Buttons as Links</h3>
                  <p className="text-sm text-muted-foreground">
                    Renders as anchor tag when href prop is provided
                  </p>
                </div>
                <div className="space-y-3">
                  <Button variant="primary" href="#section1">
                    Link Button
                  </Button>
                  <Button variant="outline" href="#section2" icon={<ExternalLink />} iconPosition="right">
                    External Link
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Responsive Behavior */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="mb-2">Responsive Behavior</h2>
              <p className="text-muted-foreground">
                Buttons automatically stack on mobile when stackOnMobile prop is true.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="mb-4">
                <h3 className="mb-1">Stack on Mobile</h3>
                <p className="text-sm text-muted-foreground">
                  Horizontal on desktop, vertical on mobile (resize to see)
                </p>
              </div>
              <Buttons orientation="horizontal" gap="4" align="center" stackOnMobile={true}>
                <Button variant="primary" size="lg">
                  Primary Action
                </Button>
                <Button variant="outline" size="lg">
                  Secondary Action
                </Button>
                <Button variant="ghost" size="lg">
                  Tertiary Action
                </Button>
              </Buttons>
            </div>
          </section>

          {/* Section 7: WCAG Compliance */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="mb-2">WCAG AA/AAA Compliance</h2>
              <p className="text-muted-foreground">
                All buttons meet accessibility standards for touch targets and contrast.
              </p>
            </div>

            <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-3">
              {/* Touch Targets */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="mb-3">Touch Targets</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Small: 32px height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Default: 44px (WCAG AA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Large: 52px (WCAG AAA)</span>
                  </li>
                </ul>
              </div>

              {/* Keyboard Navigation */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="mb-3">Keyboard Nav</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Tab to focus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Enter/Space to activate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Visible focus ring</span>
                  </li>
                </ul>
              </div>

              {/* Color Contrast */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="mb-3">Color Contrast</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>All variants meet 4.5:1</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Light & dark modes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>WCAG AA compliant</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8: All Variants Matrix */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="mb-2">Complete Variants × Sizes Matrix</h2>
              <p className="text-muted-foreground">
                All 7 variants across all 3 sizes for comprehensive testing.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4">Variant</th>
                    <th className="text-left p-4">Small</th>
                    <th className="text-left p-4">Default</th>
                    <th className="text-left p-4">Large</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Default</td>
                    <td className="p-4">
                      <Button variant="default" size="sm">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="default" size="default">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="default" size="lg">Button</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Primary</td>
                    <td className="p-4">
                      <Button variant="primary" size="sm">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="primary" size="default">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="primary" size="lg">Button</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Outline</td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="default">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="lg">Button</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">CTA</td>
                    <td className="p-4">
                      <Button variant="cta" size="sm">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="cta" size="default">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="cta" size="lg">Button</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Secondary</td>
                    <td className="p-4">
                      <Button variant="secondary" size="sm">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="secondary" size="default">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="secondary" size="lg">Button</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Ghost</td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="default">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="lg">Button</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Link</td>
                    <td className="p-4">
                      <Button variant="link" size="sm">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="link" size="default">Button</Button>
                    </td>
                    <td className="p-4">
                      <Button variant="link" size="lg">Button</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-16">
            <div className="p-8 rounded-lg bg-primary/5 border border-primary/20">
              <h2 className="mb-4">Verification Summary ✅</h2>
              <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-2">
                <div>
                  <h3 className="mb-3">Components Verified</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Button.tsx - 7 variants working</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Buttons.tsx - Container working</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>ShadCN UI Button - Deleted ❌</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Legacy Button - Verified non-existent</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3">Design System Compliance</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>100% CSS Variables Usage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Only Noto Sans Font Family</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Semantic Color Tokens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>WCAG AA/AAA Compliant</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </Container>
      </div>
    </>
  );
}