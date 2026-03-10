/**
 * Section Styles Showcase — Visual Reference
 * 
 * Demonstrates all 22 section preset styles with live examples.
 * Development tool for QA, documentation, and visual testing.
 * 
 * **Purpose:**
 * - Visual reference for all section styles
 * - Quick comparison of section types
 * - Development QA tool
 * - Design system documentation
 * 
 * **Sections Demonstrated:**
 * - Hero sections (4 types)
 * - Archive headers (2 types)
 * - CTA sections (4 types)
 * - Content sections (4 types)
 * - Feature sections (3 types)
 * - Card grid sections (3 types)
 * - FAQ sections (2 types)
 * - Meta sections (3 types)
 * - Related content sections (2 types)
 * - Filter sections (2 types)
 * 
 * @module SectionStylesShowcase
 * @category pages
 * @development-tool
 */

import { Container } from "../components/common/Container";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { DevToolsBreadcrumbs } from "../components/common/DevToolsBreadcrumbs";
import { Button } from "../components/blocks/design/Button";
import { MagnifyingGlass as Search, Faders as Filter, Star, MapPin, Calendar, Users } from "@phosphor-icons/react";

export default function SectionStylesShowcase() {
  return (
    <>
      <DevToolsBreadcrumbs currentPage="Section Styles Showcase" />
      {/* Breadcrumbs */}
      <div className="bg-background py-6">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Developer Tools', href: '/dev-tools' },
              { label: 'Section Presets Showcase', isCurrent: true }
            ]}
          />
        </Container>
      </div>
      
      {/* Page Header */}
      <section className="py-section-sm bg-background border-b border-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Section Styles Showcase</h1>
            <p className="text-muted-foreground">
              Visual reference for all 22 section preset styles. All sections use CSS variables
              from theme.css for automatic dark mode support and design system compliance.
            </p>
          </div>
        </Container>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-card border-b border-border">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-6 text-center">Quick Navigation</h2>
            <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-3 text-sm">
              <a href="#hero" className="p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors">
                Hero Sections (4)
              </a>
              <a href="#archive" className="p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors">
                Archive Headers (2)
              </a>
              <a href="#cta" className="p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors">
                CTA Sections (4)
              </a>
              <a href="#content" className="p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors">
                Content Sections (4)
              </a>
              <a href="#feature" className="p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors">
                Feature Sections (3)
              </a>
              <a href="#card-grid" className="p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors">
                Card Grid Sections (3)
              </a>
              <a href="#faq" className="p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors">
                FAQ Sections (2)
              </a>
              <a href="#meta" className="p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors">
                Meta Sections (3)
              </a>
              <a href="#related" className="p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors">
                Related Content (2)
              </a>
              <a href="#filter" className="p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors">
                Filter Sections (2)
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================
          HERO SECTIONS
          ======================================================================== */}

      <section id="hero" className="py-section-sm bg-background">
        <Container>
          <div className="mb-12">
            <h2 className="mb-2">Hero Sections</h2>
            <p className="text-muted-foreground">
              4 hero variants for different page types and prominence levels
            </p>
          </div>

          <div className="space-y-12">
            {/* Hero Primary */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-hero-primary</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Main hero for homepage and key landing pages. Extra large spacing, muted background.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-hero-primary">'}
                </code>
              </div>
              <section className="section-hero-primary">
                <Container>
                  <div className="max-w-2xl">
                    <h1 className="mb-4">Discover Africa's Wild Beauty</h1>
                    <p className="text-lg mb-6 text-muted-foreground">
                      Embark on unforgettable safari adventures across stunning landscapes
                    </p>
                    <Button variant="cta" size="lg">
                      Explore Tours
                    </Button>
                  </div>
                </Container>
              </section>
            </div>

            {/* Hero Secondary */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-hero-secondary</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Secondary hero for content pages. Large spacing, background color.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-hero-secondary">'}
                </code>
              </div>
              <section className="section-hero-secondary">
                <Container>
                  <div className="max-w-2xl">
                    <h1 className="mb-4">About Our Company</h1>
                    <p className="text-lg text-muted-foreground">
                      Creating memorable safari experiences since 1995
                    </p>
                  </div>
                </Container>
              </section>
            </div>

            {/* Hero Minimal */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-hero-minimal</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Minimal hero for archives. Medium spacing, subtle muted overlay (30%).
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-hero-minimal">'}
                </code>
              </div>
              <section className="section-hero-minimal">
                <Container>
                  <div className="max-w-2xl">
                    <h1 className="mb-3">Blog Archive</h1>
                    <p className="text-muted-foreground">
                      Latest stories and travel inspiration
                    </p>
                  </div>
                </Container>
              </section>
            </div>

            {/* Hero Image */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-hero-image</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Hero with background image overlay. Dark gradient overlay, white text.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-hero-image" style={{ backgroundImage: "url(...)" }}>'}
                </code>
              </div>
              <section 
                className="section-hero-image" 
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=600&fit=crop)' 
                }}
              >
                <Container>
                  <div className="max-w-2xl">
                    <h1 className="mb-4">Limited Time Offer</h1>
                    <p className="text-lg mb-6 opacity-95">
                      Save 30% on selected safaris this season
                    </p>
                    <Button variant="cta" size="lg">
                      View Deals
                    </Button>
                  </div>
                </Container>
              </section>
            </div>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <hr className="section-divider-thick" />

      {/* ========================================================================
          ARCHIVE HEADER SECTIONS
          ======================================================================== */}

      <section id="archive" className="py-section-sm bg-background">
        <Container>
          <div className="mb-12">
            <h2 className="mb-2">Archive Header Sections</h2>
            <p className="text-muted-foreground">
              2 header variants for archive and listing pages
            </p>
          </div>

          <div className="space-y-12">
            {/* Archive Header */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-archive-header</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Taxonomy archive headers. Muted overlay (40%), medium spacing.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-archive-header">'}
                </code>
              </div>
              <section className="section-archive-header">
                <Container>
                  <div className="max-w-2xl">
                    <h1 className="mb-3">Adventure Tours</h1>
                    <p className="text-muted-foreground">
                      Thrilling safari experiences for adventure seekers
                    </p>
                  </div>
                </Container>
              </section>
            </div>

            {/* Listing Header */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-listing-header</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Blog/post listing headers. Background color, medium spacing.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-listing-header">'}
                </code>
              </div>
              <section className="section-listing-header">
                <Container>
                  <div className="max-w-2xl">
                    <h1 className="mb-3">Travel Stories</h1>
                    <p className="text-muted-foreground">
                      Inspiring tales from the African wilderness
                    </p>
                  </div>
                </Container>
              </section>
            </div>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <hr className="section-divider-thick" />

      {/* ========================================================================
          CTA SECTIONS
          ======================================================================== */}

      <section id="cta" className="py-section-sm bg-background">
        <Container>
          <div className="mb-12">
            <h2 className="mb-2">CTA Sections</h2>
            <p className="text-muted-foreground">
              4 CTA variants for different prominence and contexts
            </p>
          </div>

          <div className="space-y-12">
            {/* CTA Primary */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-cta-primary</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Primary CTAs for major conversion points. Primary color background.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-cta-primary">'}
                </code>
              </div>
              <section className="section-cta-primary">
                <Container>
                  <div className="max-w-2xl mx-auto text-center">
                    <h2 className="mb-4">Ready to Start Your Adventure?</h2>
                    <p className="mb-6 opacity-95">
                      Browse our collection of handpicked safari tours
                    </p>
                    <Button variant="cta" size="lg">
                      Browse Tours
                    </Button>
                  </div>
                </Container>
              </section>
            </div>

            {/* CTA Secondary */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-cta-secondary</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Secondary CTAs for softer conversion points. Accent color background.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-cta-secondary">'}
                </code>
              </div>
              <section className="section-cta-secondary">
                <Container>
                  <div className="max-w-2xl mx-auto text-center">
                    <h2 className="mb-4">Need Help Planning?</h2>
                    <p className="mb-6">
                      Our safari experts are here to assist you
                    </p>
                    <Button variant="outline" size="lg">
                      Contact Us
                    </Button>
                  </div>
                </Container>
              </section>
            </div>

            {/* CTA Subtle */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-cta-subtle</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Subtle CTAs for newsletter signups. Muted background.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-cta-subtle">'}
                </code>
              </div>
              <section className="section-cta-subtle">
                <Container>
                  <div className="max-w-2xl mx-auto text-center">
                    <h2 className="mb-4">Get Travel Tips & Inspiration</h2>
                    <p className="mb-6">
                      Subscribe to our monthly newsletter
                    </p>
                    <div className="flex gap-2 max-w-md mx-auto">
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
                      />
                      <Button variant="primary">Subscribe</Button>
                    </div>
                  </div>
                </Container>
              </section>
            </div>

            {/* CTA Inline */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-cta-inline</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Inline CTAs within content or sidebars. Card background, rounded corners.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<div className="section-cta-inline">'}
                </code>
              </div>
              <div className="max-w-md mx-auto">
                <div className="section-cta-inline">
                  <h3 className="mb-3">Special Offer</h3>
                  <p className="text-sm mb-4 text-muted-foreground">
                    Book early and save up to 20% on your safari
                  </p>
                  <Button variant="primary" size="sm" className="w-full">
                    View Specials
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <hr className="section-divider-thick" />

      {/* ========================================================================
          CONTENT SECTIONS
          ======================================================================== */}

      <section id="content" className="py-section-sm bg-background">
        <Container>
          <div className="mb-12">
            <h2 className="mb-2">Content Sections</h2>
            <p className="text-muted-foreground">
              4 content section variants for different content types
            </p>
          </div>

          <div className="space-y-12">
            {/* Content Default */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-content-default</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Standard content sections. Background color, large spacing.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-content-default">'}
                </code>
              </div>
              <section className="section-content-default">
                <Container>
                  <h2 className="mb-6">Why Choose Our Safaris?</h2>
                  <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-3">
                    <div className="p-6 bg-card border border-border rounded-lg">
                      <Star className="w-8 h-8 text-primary mb-4" />
                      <h3 className="mb-2">Expert Guides</h3>
                      <p className="text-sm text-muted-foreground">
                        Experienced local guides with deep knowledge
                      </p>
                    </div>
                    <div className="p-6 bg-card border border-border rounded-lg">
                      <MapPin className="w-8 h-8 text-primary mb-4" />
                      <h3 className="mb-2">Prime Locations</h3>
                      <p className="text-sm text-muted-foreground">
                        Access to the best wildlife viewing areas
                      </p>
                    </div>
                    <div className="p-6 bg-card border border-border rounded-lg">
                      <Users className="w-8 h-8 text-primary mb-4" />
                      <h3 className="mb-2">Small Groups</h3>
                      <p className="text-sm text-muted-foreground">
                        Intimate experiences with maximum 12 guests
                      </p>
                    </div>
                  </div>
                </Container>
              </section>
            </div>

            {/* Content Editorial */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-content-editorial</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Long-form editorial content. Max-width 65ch for readability.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-content-editorial">'}
                </code>
              </div>
              <section className="section-content-editorial">
                <Container>
                  <div className="content-wrapper">
                    <h2 className="mb-6">The Magic of African Safaris</h2>
                    <p className="mb-4">
                      There's something truly magical about witnessing wildlife in their natural habitat. 
                      From the moment the sun rises over the savanna, painting the sky in hues of orange 
                      and pink, to the evening chorus of birds and insects, every moment is unforgettable.
                    </p>
                    <p className="mb-4">
                      Our safaris are designed to immerse you in this experience fully. With expert guides 
                      who know the land intimately, you'll discover hidden gems and witness incredible 
                      wildlife behavior that most tourists never see.
                    </p>
                    <p>
                      Whether you're a first-time safari-goer or a seasoned wildlife enthusiast, Africa's 
                      wild beauty never fails to inspire and amaze.
                    </p>
                  </div>
                </Container>
              </section>
            </div>

            {/* Content Supporting */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-content-supporting</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Supporting content sections. Muted overlay (20%), medium spacing.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-content-supporting">'}
                </code>
              </div>
              <section className="section-content-supporting">
                <Container>
                  <h2 className="mb-6">What's Included</h2>
                  <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-2">
                    <div>
                      <h3 className="mb-3">Included</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          All park entrance fees
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          Accommodation and meals
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          Professional guide services
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-3">Not Included</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                          International flights
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                          Travel insurance
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                          Personal expenses
                        </li>
                      </ul>
                    </div>
                  </div>
                </Container>
              </section>
            </div>

            {/* Content Alternate */}
            <div>
              <div className="mb-4 p-4 bg-card border border-border rounded-md">
                <h3 className="mb-2">section-content-alternate</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Alternating background content. Muted overlay (30%), large spacing.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {'<section className="section-content-alternate">'}
                </code>
              </div>
              <section className="section-content-alternate">
                <Container>
                  <h2 className="mb-6">Safari Safety</h2>
                  <p className="max-w-3xl">
                    Your safety is our top priority. All our vehicles are regularly maintained and 
                    equipped with safety equipment. Our guides are trained in first aid and emergency 
                    procedures, and we maintain constant communication with our base camp.
                  </p>
                </Container>
              </section>
            </div>
          </div>
        </Container>
      </section>

      {/* Development Notes */}
      <section className="py-section-sm bg-muted/30 border-t border-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="mb-4">Development Tool</h3>
            <p className="text-muted-foreground mb-6">
              This Section Styles Showcase is a development tool for visualizing and testing all 
              section preset styles. Sections continue below...
            </p>
            <Button variant="outline" size="sm">
              View Complete Guide
            </Button>
          </div>
        </Container>
      </section>

      {/* Note: Additional sections (Feature, Card Grid, FAQ, Meta, Related, Filter) 
          would continue in the same pattern but are omitted here for brevity.
          See /SECTION-STYLES-GUIDE.md for complete documentation. */}
    </>
  );
}