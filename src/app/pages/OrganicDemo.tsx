/**
 * Organic Redesign Demo Page
 * 
 * Demonstrates the progressive gradient approach:
 * - TOP: Savanna Sunset (Hero section)
 * - MIDDLE: Acacia & Clay (Content sections)
 * - BOTTOM: Minimal Earth (Footer section)
 * 
 * Features:
 * - Organic color palette
 * - Progressive texture levels (3 → 2 → 1)
 * - Organic shapes (blobs, pebbles, increased radius)
 * - Handwritten accent fonts (used sparingly)
 * - Warm Night dark mode
 */

import { Container } from "../components/common/Container";
import { Hero } from "../components/patterns/Hero";
import { FAQ } from "../components/patterns/FAQ";
import { TOURS } from "../data/mock";
import { WebGLGraphics } from "../components/common/WebGLGraphics";

export default function OrganicDemo() {
  return (
    <div className="organic-demo-page theme-organic">
      {/* ============================================
          TOP SECTION — Savanna Sunset Palette
          - Warm cream/sand backgrounds
          - Rich texture (Level 3)
          - Organic blob shapes
          ============================================ */}
      <div className="organic-section-top">
        <Hero
          title="Discover Wild Africa"
          description="Embark on a transformative journey through breathtaking landscapes and encounter majestic wildlife in their natural habitat."
          badge={{ label: "Adventure Awaits", icon: "Compass" }}
          primaryCTA={{
            label: "Explore Tours",
            href: "/tours",
          }}
          secondaryCTA={{
            label: "Learn More",
            href: "/about",
          }}
          height="large"
          showScrollIndicator
          animated
        />
      </div>

      {/* ============================================
          WEBGL INTEGRATION PLAN & DEMO
          ============================================ */}
      <section className="relative w-full py-[var(--spacing-section-lg)] overflow-hidden organic-section-middle">
        {/* Ambient Waves in the background (Demo of transition graphics) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[var(--webgl-opacity,0.2)]">
          <WebGLGraphics 
            variant="waves" 
            colorVar1="--organic-clay-primary" 
            colorVar2="--organic-clay-accent" 
          />
        </div>

        <Container className="relative z-10">
          <div className="text-center mb-[var(--spacing-element-2xl)]">
            <h2 className="text-fluid-4xl mb-[var(--spacing-element-sm)] font-serif">
              WebGL Graphics Plan
            </h2>
            <p className="text-fluid-lg max-w-3xl mx-auto text-muted-foreground">
              We integrate performant, organic WebGL shaders directly connected to our design system's CSS variables. Here is how they enhance the experience across different sections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-gap-lg)]">
            {/* Dune Shader Plan */}
            <div className="rounded-[var(--radius-lg)] overflow-hidden flex flex-col h-[400px] shadow-md organic-section-top-alt">
              <div className="relative h-48 w-full flex-shrink-0">
                <WebGLGraphics variant="dunes" colorVar1="--organic-sunset-primary" colorVar2="--organic-sunset-accent" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none drop-shadow-md">
                  <h3 className="text-fluid-2xl font-bold font-serif text-primary-foreground">Hero Dunes</h3>
                </div>
              </div>
              <div className="p-[var(--spacing-element-lg)] flex-grow">
                <h4 className="text-fluid-xl mb-[var(--spacing-element-xs)] font-serif font-bold">Top Sections</h4>
                <p className="text-fluid-base text-muted-foreground">
                  A slow, shifting fluid distortion map mimicking wind over sand dunes or slow-moving water. Behind hero text, using the "Savanna Sunset" palette.
                </p>
              </div>
            </div>

            {/* Waves Shader Plan */}
            <div className="rounded-[var(--radius-lg)] overflow-hidden flex flex-col h-[400px] shadow-md organic-section-middle-alt">
              <div className="relative h-48 w-full flex-shrink-0">
                <WebGLGraphics variant="waves" colorVar1="--organic-clay-primary" colorVar2="--organic-clay-accent" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none drop-shadow-md">
                  <h3 className="text-fluid-2xl font-bold font-serif text-primary-foreground">Transition Waves</h3>
                </div>
              </div>
              <div className="p-[var(--spacing-element-lg)] flex-grow">
                <h4 className="text-fluid-xl mb-[var(--spacing-element-xs)] font-serif font-bold">Middle Sections</h4>
                <p className="text-fluid-base text-muted-foreground">
                  Gently undulating waves that separate major page sections dynamically. This replaces static SVG dividers for a more organic feel.
                </p>
              </div>
            </div>

            {/* Particles Shader Plan */}
            <div className="rounded-[var(--radius-lg)] overflow-hidden flex flex-col h-[400px] shadow-md organic-section-bottom-alt">
              <div className="relative h-48 w-full flex-shrink-0 bg-background">
                <WebGLGraphics variant="particles" colorVar1="--organic-earth-accent" colorVar2="--organic-earth-primary" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none drop-shadow-md">
                  <h3 className="text-fluid-2xl font-bold font-serif text-primary-foreground">Ambient Particles</h3>
                </div>
              </div>
              <div className="p-[var(--spacing-element-lg)] flex-grow">
                <h4 className="text-fluid-xl mb-[var(--spacing-element-xs)] font-serif font-bold">Footer / Dark Mode</h4>
                <p className="text-fluid-base text-muted-foreground">
                  Floating dust motes or "fireflies" that drift gently. Highly effective in the "Warm Night Safari" dark mode to add depth.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================
          MIDDLE SECTION — Acacia & Clay Palette
          ============================================ */}
      <section className="organic-section-middle py-[var(--spacing-section-lg)]">
        <Container>
          {/* Handwritten accent heading (use sparingly!) */}
          <div className="text-center mb-[var(--spacing-element-2xl)]">
            <h2 className="text-fluid-4xl mb-[var(--spacing-element-sm)] wp-text--hand font-serif">
              Featured Adventures
            </h2>
            <p className="text-fluid-lg max-w-3xl mx-auto text-muted-foreground">
              Curated experiences that blend adventure, comfort, and authentic cultural immersion.
            </p>
          </div>

          {/* Card Grid with organic styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-gap-md)]">
            {TOURS.slice(0, 3).map((tour) => (
              <div
                key={tour.id}
                className="rounded-[var(--radius-lg)] p-[var(--spacing-element-lg)] transition-transform hover:scale-[1.02] shadow-md bg-card"
              >
                {/* Tour image */}
                {tour.image && (
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="rounded-[var(--radius-md)] w-full h-48 object-cover mb-[var(--spacing-element-md)]"
                  />
                )}

                {/* Tour content */}
                <h3 className="text-fluid-2xl mb-[var(--spacing-element-xs)] font-serif font-bold text-foreground">
                  {tour.title}
                </h3>
                <p className="text-fluid-base mb-[var(--spacing-element-lg)] text-muted-foreground">
                  {tour.excerpt}
                </p>

                {/* Organic pebble button */}
                <button className="organic-pebble px-[var(--spacing-element-lg)] py-[var(--spacing-element-md)] font-medium transition-transform hover:scale-105 bg-primary text-primary-foreground">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================
          MIDDLE SECTION (ALT) — Feature List
          ============================================ */}
      <section className="organic-section-middle-alt py-[var(--spacing-section-lg)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-gap-2xl)] items-center">
            {/* Content */}
            <div>
              <h2 className="text-fluid-4xl mb-[var(--spacing-element-lg)] font-serif text-foreground">
                Why Choose Acacia Drift?
              </h2>
              <p className="text-fluid-lg mb-[var(--spacing-element-lg)] text-muted-foreground">
                We craft unforgettable safari experiences with deep respect for nature and local communities.
              </p>

              {/* Feature list */}
              <ul className="flex flex-col gap-[var(--spacing-gap-md)] m-0 p-0 list-none">
                {[
                  { title: 'Expert Guides', desc: 'Local knowledge and wildlife expertise' },
                  { title: 'Sustainable Travel', desc: 'Eco-conscious tours that give back' },
                  { title: 'Small Groups', desc: 'Intimate experiences, maximum impact' },
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-[var(--spacing-gap-sm)]">
                    <div className="rounded-[var(--radius-full)] w-12 h-12 flex items-center justify-center flex-shrink-0 bg-primary text-primary-foreground">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-fluid-xl font-bold font-serif mb-1 text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-fluid-base text-muted-foreground m-0">
                        {feature.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organic blob image placeholder */}
            <div className="organic-blob-lg overflow-hidden bg-primary min-h-[400px] flex items-center justify-center">
              <p className="text-fluid-3xl font-bold text-center px-8 text-primary-foreground wp-text--hand drop-shadow-md">
                Safari Adventure Awaits
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================
          FAQ SECTION — Acacia & Clay
          ============================================ */}
      <section className="organic-section-middle py-[var(--spacing-section-lg)]">
        <Container>
          <div className="text-center mb-[var(--spacing-element-2xl)]">
            <h2 className="text-fluid-4xl mb-[var(--spacing-element-sm)] font-serif text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-fluid-lg text-muted-foreground">
              Everything you need to know about our safari experiences.
            </p>
          </div>

          <FAQ
            items={[
              {
                id: 'faq-1',
                question: 'What is included in a safari tour?',
                answer: 'Our tours include accommodation, meals, guided game drives, park fees, and airport transfers. Optional activities can be added.',
              },
              {
                id: 'faq-2',
                question: 'What is the best time to visit?',
                answer: 'The dry season (June-October) offers excellent wildlife viewing. The green season (November-May) provides lush landscapes and fewer crowds.',
              },
              {
                id: 'faq-3',
                question: 'Do you offer custom private tours?',
                answer: 'Yes! We specialize in tailor-made safaris designed around your interests, budget, and timeline.',
              },
            ]}
          />
        </Container>
      </section>

      {/* ============================================
          BOTTOM SECTION — Minimal Earth Palette
          ============================================ */}
      <section className="organic-section-bottom py-[var(--spacing-section-lg)]">
        <Container>
          {/* CTA with organic styling */}
          <div className="rounded-[var(--radius-xl)] p-[var(--spacing-element-2xl)] text-center bg-card shadow-lg">
            <h2 className="text-fluid-4xl mb-[var(--spacing-element-sm)] wp-text--hand font-serif text-foreground">
              Ready for Your Adventure?
            </h2>
            <p className="text-fluid-lg mb-[var(--spacing-element-xl)] max-w-2xl mx-auto text-muted-foreground">
              Let's create your dream safari experience together.
            </p>

            {/* Organic pebble CTA button */}
            <button className="organic-pebble px-[var(--spacing-element-xl)] py-[var(--spacing-element-md)] text-fluid-lg font-medium transition-transform hover:scale-105 bg-primary text-primary-foreground shadow-md">
              Start Planning
            </button>
          </div>

          {/* Decorative flourish (handwritten font - very sparingly!) */}
          <p className="text-center mt-[var(--spacing-element-lg)] text-fluid-sm text-muted-foreground wp-text--hand-alt">
            Est. 2024
          </p>
        </Container>
      </section>
    </div>
  );
}
