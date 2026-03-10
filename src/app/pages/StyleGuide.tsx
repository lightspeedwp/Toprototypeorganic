/**
 * Style Guide - Developer Tool
 * 
 * Complete design system style guide covering typography, colors, spacing,
 * borders, shadows, and component patterns.
 * 
 * **Purpose:**
 * - Design system reference
 * - Typography hierarchy
 * - Color palette documentation
 * - Spacing scale reference
 * - Component styling patterns
 * 
 * **Sections:**
 * - Typography (fonts, sizes, weights)
 * - Colors (semantic tokens, palette)
 * - Spacing (scale, patterns)
 * - Borders & Radius
 * - Shadows & Elevation
 * - Component Examples
 * 
 * @module StyleGuide
 * @category pages
 * @development-tool
 */

import { Container } from '../components/common/Container';
import { DevToolsBreadcrumbs } from '../components/common/DevToolsBreadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/blocks/ui/card';
import { Button } from '../components/blocks/design/Button';
import { Check, WarningCircle as AlertCircle, Info } from '@phosphor-icons/react';

export default function StyleGuide() {
  return (
    <>
      <DevToolsBreadcrumbs currentPage="Colour Contrast Audit" />
      <div className="min-h-screen bg-background py-section-sm">
        <Container>
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4">Style Guide</h1>
            <p className="text-muted-foreground max-w-3xl">
              Complete design system reference for the LightSpeed Tour Operator prototype.
              All styles use CSS variables for consistency and easy updates.
            </p>
          </div>

          {/* Typography Section */}
          <section className="mb-16">
            <h2 className="mb-6">Typography</h2>
            
            <div className="space-y-8">
              {/* Font Families */}
              <Card>
                <CardHeader>
                  <CardTitle>Font Families</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">
                      Headings: <code className="px-2 py-1 bg-muted rounded">var(--font-family-lora)</code>
                    </div>
                    <div className="text-2xl font-serif">
                      Lora - Elegant Serif for Headings
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">
                      Body: <code className="px-2 py-1 bg-muted rounded">var(--font-family-noto-sans)</code>
                    </div>
                    <div className="text-base font-sans">
                      Noto Sans - Clean Sans-Serif for Body Text
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Heading Hierarchy */}
              <Card>
                <CardHeader>
                  <CardTitle>Heading Hierarchy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h1 className="mb-1">Heading 1 - 48px Bold (700)</h1>
                      <code className="text-xs text-muted-foreground">
                        var(--text-6xl) / var(--font-weight-bold)
                      </code>
                    </div>
                    <div>
                      <h2 className="mb-1">Heading 2 - 32px Semibold (600)</h2>
                      <code className="text-xs text-muted-foreground">
                        var(--text-4xl) / var(--font-weight-semibold)
                      </code>
                    </div>
                    <div>
                      <h3 className="mb-1">Heading 3 - 24px Semibold (600)</h3>
                      <code className="text-xs text-muted-foreground">
                        var(--text-3xl) / var(--font-weight-semibold)
                      </code>
                    </div>
                    <div>
                      <h4 className="mb-1">Heading 4 - 20px Medium (500)</h4>
                      <code className="text-xs text-muted-foreground">
                        var(--text-2xl) / var(--font-weight-medium)
                      </code>
                    </div>
                    <div>
                      <h5 className="mb-1">Heading 5 - 18px Medium (500)</h5>
                      <code className="text-xs text-muted-foreground">
                        var(--text-xl) / var(--font-weight-medium)
                      </code>
                    </div>
                    <div>
                      <h6 className="mb-1">Heading 6 - 16px Medium (500)</h6>
                      <code className="text-xs text-muted-foreground">
                        var(--text-lg) / var(--font-weight-medium)
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Body Text */}
              <Card>
                <CardHeader>
                  <CardTitle>Body Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="mb-1">Paragraph - 16px Normal (400)</p>
                    <code className="text-xs text-muted-foreground">
                      var(--text-base) / var(--font-weight-normal)
                    </code>
                  </div>
                  <div>
                    <p className="text-sm mb-1">Small Text - 14px Normal (400)</p>
                    <code className="text-xs text-muted-foreground">
                      text-sm / var(--font-weight-normal)
                    </code>
                  </div>
                  <div>
                    <p className="text-xs mb-1">Extra Small - 12px Normal (400)</p>
                    <code className="text-xs text-muted-foreground">
                      text-xs / var(--font-weight-normal)
                    </code>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Colors Section */}
          <section className="mb-16">
            <h2 className="mb-6">Color System</h2>
            
            <div className="space-y-8">
              {/* Semantic Colors */}
              <Card>
                <CardHeader>
                  <CardTitle>Semantic Color Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-2">
                    {/* Foreground Colors */}
                    <div className="space-y-3">
                      <h4 className="mb-3">Foreground</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded border bg-foreground"></div>
                        <div className="flex-1">
                          <div className="font-medium">Foreground</div>
                          <code className="text-xs text-muted-foreground">text-foreground</code>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded border bg-muted-foreground"></div>
                        <div className="flex-1">
                          <div className="font-medium">Muted Foreground</div>
                          <code className="text-xs text-muted-foreground">text-muted-foreground</code>
                        </div>
                      </div>
                    </div>

                    {/* Background Colors */}
                    <div className="space-y-3">
                      <h4 className="mb-3">Background</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded border bg-background"></div>
                        <div className="flex-1">
                          <div className="font-medium">Background</div>
                          <code className="text-xs text-muted-foreground">bg-background</code>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded border bg-card"></div>
                        <div className="flex-1">
                          <div className="font-medium">Card</div>
                          <code className="text-xs text-muted-foreground">bg-card</code>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded border bg-muted"></div>
                        <div className="flex-1">
                          <div className="font-medium">Muted</div>
                          <code className="text-xs text-muted-foreground">bg-muted</code>
                        </div>
                      </div>
                    </div>

                    {/* Accent Colors */}
                    <div className="space-y-3">
                      <h4 className="mb-3">Accent</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded border bg-primary"></div>
                        <div className="flex-1">
                          <div className="font-medium">Primary</div>
                          <code className="text-xs text-muted-foreground">bg-primary</code>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded border bg-secondary"></div>
                        <div className="flex-1">
                          <div className="font-medium">Secondary</div>
                          <code className="text-xs text-muted-foreground">bg-secondary</code>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded border bg-accent"></div>
                        <div className="flex-1">
                          <div className="font-medium">Accent</div>
                          <code className="text-xs text-muted-foreground">bg-accent</code>
                        </div>
                      </div>
                    </div>

                    {/* Status Colors */}
                    <div className="space-y-3">
                      <h4 className="mb-3">Status</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded border bg-destructive"></div>
                        <div className="flex-1">
                          <div className="font-medium">Destructive</div>
                          <code className="text-xs text-muted-foreground">bg-destructive</code>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded border border-border"></div>
                        <div className="flex-1">
                          <div className="font-medium">Border</div>
                          <code className="text-xs text-muted-foreground">border-border</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WCAG Compliance */}
              <Card>
                <CardHeader>
                  <CardTitle>WCAG AA Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Contrast Ratios</div>
                        <p className="text-sm text-muted-foreground">
                          All color combinations meet 4.5:1 minimum contrast ratio
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Dark Mode Support</div>
                        <p className="text-sm text-muted-foreground">
                          Automatic dark mode via CSS custom properties
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Spacing Section */}
          <section className="mb-16">
            <h2 className="mb-6">Spacing Scale</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Tailwind Spacing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { class: 'p-2', size: '8px', var: '0.5rem' },
                    { class: 'p-4', size: '16px', var: '1rem' },
                    { class: 'p-6', size: '24px', var: '1.5rem' },
                    { class: 'p-8', size: '32px', var: '2rem' },
                    { class: 'p-12', size: '48px', var: '3rem' },
                    { class: 'p-16', size: '64px', var: '4rem' },
                  ].map((spacing) => (
                    <div key={spacing.class} className="flex items-center gap-4">
                      <code className="w-16 text-xs font-medium">{spacing.class}</code>
                      <div className={`${spacing.class} bg-primary`}></div>
                      <span className="text-sm text-muted-foreground">
                        {spacing.size} ({spacing.var})
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Components Section */}
          <section className="mb-16">
            <h2 className="mb-6">Component Examples</h2>
            
            <div className="space-y-6">
              {/* Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">Variants</div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="default">Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">Sizes</div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Messages */}
              <Card>
                <CardHeader>
                  <CardTitle>Status Messages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary rounded-lg">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Success Message</div>
                      <p className="text-sm text-muted-foreground">
                        This is a success message using primary color
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive rounded-lg">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <div>
                      <div className="font-medium">Error Message</div>
                      <p className="text-sm text-muted-foreground">
                        This is an error message using destructive color
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-accent border border-border rounded-lg">
                    <Info className="w-5 h-5 text-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Info Message</div>
                      <p className="text-sm text-muted-foreground">
                        This is an info message using accent background
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Principles */}
          <section className="mb-16">
            <h2 className="mb-6">Design Principles</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Core Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2">1. Use Semantic HTML</h4>
                    <p className="text-sm text-muted-foreground">
                      Use <code>&lt;h1&gt;</code>-<code>&lt;h6&gt;</code> for headings, not Tailwind classes like <code>text-2xl font-bold</code>
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2">2. Use CSS Variables</h4>
                    <p className="text-sm text-muted-foreground">
                      All styling uses CSS custom properties from theme.css for consistency
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2">3. Use Semantic Color Tokens</h4>
                    <p className="text-sm text-muted-foreground">
                      Use <code>text-foreground</code>, <code>bg-card</code>, etc. instead of hardcoded colors
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2">4. WCAG AA Compliance</h4>
                    <p className="text-sm text-muted-foreground">
                      All color combinations must meet 4.5:1 minimum contrast ratio
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2">5. Mobile-First Responsive</h4>
                    <p className="text-sm text-muted-foreground">
                      Use responsive breakpoints: <code>md:</code> (768px), <code>lg:</code> (1024px)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Resources */}
          <section>
            <h2 className="mb-6">Resources</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/dev-tools/component-showcase" className="text-primary hover:underline">
                      Component Showcase - View all 27 components
                    </a>
                  </li>
                  <li>
                    <a href="/dev-tools/button-showcase" className="text-primary hover:underline">
                      Button Showcase - All button styles
                    </a>
                  </li>
                  <li>
                    <a href="/dev-tools/section-presets" className="text-primary hover:underline">
                      Section Presets - 22 section styles
                    </a>
                  </li>
                  <li>
                    <code className="px-2 py-1 bg-muted rounded">/guidelines/design-tokens/</code> - Design token documentation
                  </li>
                  <li>
                    <code className="px-2 py-1 bg-muted rounded">/src/styles/theme.css</code> - CSS variable definitions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </Container>
      </div>
    </>
  );
}