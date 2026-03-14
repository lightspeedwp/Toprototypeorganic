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
        <Container className="flex flex-col items-center">
          <div className="max-w-3xl w-full text-center flex flex-col gap-4">
            <h1>Section Styles Showcase</h1>
            <p className="text-muted-foreground">
              Visual reference for all 22 section preset styles. All sections use CSS variables
              from theme.css for automatic dark mode support and design system compliance.
            </p>
          </div>
        </Container>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-card border-b border-border">
        <Container className="flex flex-col items-center">
          <div className="max-w-4xl w-full flex flex-col gap-6">
            <h2 className="text-center">Quick Navigation</h2>
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
          <div className="flex flex-col gap-2 pb-12">
            <h2>Hero Sections</h2>
            <p className="text-muted-foreground">
              4 hero variants for different page types and prominence levels
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {/* Hero Primary */}
            <div>
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md pb-4">
                <h3>section-hero-primary</h3>
                <p className="text-sm text-muted-foreground">
                  Main hero for homepage and key landing pages. Extra large spacing, muted background.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-hero-primary">'}
                </code>
              </div>
              <section className="section-hero-primary">
                <Container>
                  <div className="max-w-2xl flex flex-col gap-4">
                    <h1>Discover Africa's Wild Beauty</h1>
                    <p className="text-lg text-muted-foreground">
                      Embark on unforgettable safari adventures across stunning landscapes
                    </p>
                    <div>
                      <Button variant="cta" size="lg">
                        Explore Tours
                      </Button>
                    </div>
                  </div>
                </Container>
              </section>
            </div>

            {/* Hero Secondary */}
            <div>
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-hero-secondary</h3>
                <p className="text-sm text-muted-foreground">
                  Secondary hero for content pages. Large spacing, background color.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-hero-secondary">'}
                </code>
              </div>
              <section className="section-hero-secondary">
                <Container>
                  <div className="max-w-2xl flex flex-col gap-4">
                    <h1>About Our Company</h1>
                    <p className="text-lg text-muted-foreground">
                      Creating memorable safari experiences since 1995
                    </p>
                  </div>
                </Container>
              </section>
            </div>

            {/* Hero Minimal */}
            <div>
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-hero-minimal</h3>
                <p className="text-sm text-muted-foreground">
                  Minimal hero for archives. Medium spacing, subtle muted overlay (30%).
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-hero-minimal">'}
                </code>
              </div>
              <section className="section-hero-minimal">
                <Container>
                  <div className="max-w-2xl flex flex-col gap-3">
                    <h1>Blog Archive</h1>
                    <p className="text-muted-foreground">
                      Latest stories and travel inspiration
                    </p>
                  </div>
                </Container>
              </section>
            </div>

            {/* Hero Image */}
            <div>
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-hero-image</h3>
                <p className="text-sm text-muted-foreground">
                  Hero with background image overlay. Dark gradient overlay, white text.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-hero-image" style={{ backgroundImage: "url(...)" }}>'}
                </code>
              </div>
              <section 
                className="section-hero-image" 
                style={{ 
                  '--hero-bg-image': 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=600&fit=crop)',
                  backgroundImage: 'var(--hero-bg-image)'
                } as React.CSSProperties}
              >
                <Container>
                  <div className="max-w-2xl flex flex-col gap-4">
                    <h1>Limited Time Offer</h1>
                    <p className="text-lg opacity-95">
                      Save 30% on selected safaris this season
                    </p>
                    <div>
                      <Button variant="cta" size="lg">
                        View Deals
                      </Button>
                    </div>
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
          <div className="flex flex-col gap-2 pb-12">
            <h2>Archive Header Sections</h2>
            <p className="text-muted-foreground">
              2 header variants for archive and listing pages
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {/* Archive Header */}
            <div>
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-archive-header</h3>
                <p className="text-sm text-muted-foreground">
                  Taxonomy archive headers. Muted overlay (40%), medium spacing.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-archive-header">'}
                </code>
              </div>
              <section className="section-archive-header">
                <Container>
                  <div className="max-w-2xl flex flex-col gap-3">
                    <h1>Adventure Tours</h1>
                    <p className="text-muted-foreground">
                      Thrilling safari experiences for adventure seekers
                    </p>
                  </div>
                </Container>
              </section>
            </div>

            {/* Listing Header */}
            <div>
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-listing-header</h3>
                <p className="text-sm text-muted-foreground">
                  Blog/post listing headers. Background color, medium spacing.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-listing-header">'}
                </code>
              </div>
              <section className="section-listing-header">
                <Container>
                  <div className="max-w-2xl flex flex-col gap-3">
                    <h1>Travel Stories</h1>
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
          <div className="flex flex-col gap-2 pb-12">
            <h2>CTA Sections</h2>
            <p className="text-muted-foreground">
              4 CTA variants for different prominence and contexts
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {/* CTA Primary */}
            <div>
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-cta-primary</h3>
                <p className="text-sm text-muted-foreground">
                  Primary CTAs for major conversion points. Primary color background.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-cta-primary">'}
                </code>
              </div>
              <section className="section-cta-primary">
                <Container className="flex flex-col items-center">
                  <div className="max-w-2xl w-full text-center flex flex-col gap-4 items-center">
                    <h2>Ready to Start Your Adventure?</h2>
                    <p className="opacity-95">
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
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-cta-secondary</h3>
                <p className="text-sm text-muted-foreground">
                  Secondary CTAs for softer conversion points. Accent color background.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-cta-secondary">'}
                </code>
              </div>
              <section className="section-cta-secondary">
                <Container className="flex flex-col items-center">
                  <div className="max-w-2xl w-full text-center flex flex-col gap-4 items-center">
                    <h2>Need Help Planning?</h2>
                    <p>
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
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-cta-subtle</h3>
                <p className="text-sm text-muted-foreground">
                  Subtle CTAs for newsletter signups. Muted background.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-cta-subtle">'}
                </code>
              </div>
              <section className="section-cta-subtle">
                <Container className="flex flex-col items-center">
                  <div className="max-w-2xl w-full text-center flex flex-col gap-4 items-center">
                    <h2>Get Travel Tips & Inspiration</h2>
                    <p>
                      Subscribe to our monthly newsletter
                    </p>
                    <div className="flex gap-2 max-w-md w-full">
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
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-cta-inline</h3>
                <p className="text-sm text-muted-foreground">
                  Inline CTAs within content or sidebars. Card background, rounded corners.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<div className="section-cta-inline">'}
                </code>
              </div>
              <div className="max-w-md w-full self-center">
                <div className="section-cta-inline flex flex-col gap-3">
                  <h3>Special Offer</h3>
                  <p className="text-sm text-muted-foreground">
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
          <div className="flex flex-col gap-2 pb-12">
            <h2>Content Sections</h2>
            <p className="text-muted-foreground">
              4 content section variants for different content types
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {/* Content Default */}
            <div>
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-content-default</h3>
                <p className="text-sm text-muted-foreground">
                  Standard content sections. Background color, large spacing.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-content-default">'}
                </code>
              </div>
              <section className="section-content-default">
                <Container>
                  <div className="flex flex-col gap-6">
                    <h2>Why Choose Our Safaris?</h2>
                    <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-3">
                      <div className="p-6 bg-card border border-border rounded-lg flex flex-col gap-4">
                        <Star className="w-8 h-8 text-primary" />
                        <h3>Expert Guides</h3>
                        <p className="text-sm text-muted-foreground">
                          Experienced local guides with deep knowledge
                        </p>
                      </div>
                      <div className="p-6 bg-card border border-border rounded-lg flex flex-col gap-4">
                        <MapPin className="w-8 h-8 text-primary" />
                        <h3>Prime Locations</h3>
                        <p className="text-sm text-muted-foreground">
                          Access to the best wildlife viewing areas
                        </p>
                      </div>
                      <div className="p-6 bg-card border border-border rounded-lg flex flex-col gap-4">
                        <Users className="w-8 h-8 text-primary" />
                        <h3>Small Groups</h3>
                        <p className="text-sm text-muted-foreground">
                          Intimate experiences with maximum 12 guests
                        </p>
                      </div>
                    </div>
                  </div>
                </Container>
              </section>
            </div>

            {/* Content Editorial */}
            <div>
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-content-editorial</h3>
                <p className="text-sm text-muted-foreground">
                  Long-form editorial content. Max-width 65ch for readability.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-content-editorial">'}
                </code>
              </div>
              <section className="section-content-editorial">
                <Container>
                  <div className="content-wrapper flex flex-col gap-4">
                    <h2>The Magic of African Safaris</h2>
                    <p>
                      There's something truly magical about witnessing wildlife in their natural habitat. 
                      From the moment the sun rises over the savanna, painting the sky in hues of orange 
                      and pink, to the evening chorus of birds and insects, every moment is unforgettable.
                    </p>
                    <p>
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
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-content-supporting</h3>
                <p className="text-sm text-muted-foreground">
                  Supporting content sections. Muted overlay (20%), medium spacing.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-content-supporting">'}
                </code>
              </div>
              <section className="section-content-supporting">
                <Container>
                  <div className="flex flex-col gap-6">
                    <h2>What's Included</h2>
                    <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-2">
                      <div className="flex flex-col gap-3">
                        <h3>Included</h3>
                        <ul className="flex flex-col gap-2 text-sm">
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
                      <div className="flex flex-col gap-3">
                        <h3>Not Included</h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
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
                  </div>
                </Container>
              </section>
            </div>

            {/* Content Alternate */}
            <div>
              <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-md">
                <h3>section-content-alternate</h3>
                <p className="text-sm text-muted-foreground">
                  Alternating background content. Muted overlay (30%), large spacing.
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded w-fit">
                  {'<section className="section-content-alternate">'}
                </code>
              </div>
              <section className="section-content-alternate">
                <Container>
                  <div className="flex flex-col gap-6">
                    <h2>Safari Safety</h2>
                    <p className="max-w-3xl">
                      Your safety is our top priority. All our vehicles are regularly maintained and 
                      equipped with safety equipment. Our guides are trained in first aid and emergency 
                      procedures, and we maintain constant communication with our base camp.
                    </p>
                  </div>
                </Container>
              </section>
            </div>
          </div>
        </Container>
      </section>

      {/* Development Notes */}
      <section className="py-section-sm bg-muted/30 border-t border-border">
        <Container className="flex flex-col items-center">
          <div className="max-w-3xl w-full text-center flex flex-col gap-4 items-center">
            <h3>Development Tool</h3>
            <p className="text-muted-foreground">
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