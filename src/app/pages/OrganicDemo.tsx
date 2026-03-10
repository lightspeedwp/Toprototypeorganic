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
      <section className="relative w-full py-section-lg overflow-hidden organic-section-middle">
        {/* Ambient Waves in the background (Demo of transition graphics) */}
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none">
          <WebGLGraphics 
            variant="waves" 
            colorVar1="--organic-clay-primary" 
            colorVar2="--organic-clay-accent" 
          />
        </div>

        <Container className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-fluid-4xl mb-4">
              WebGL Graphics Plan
            </h2>
            <p className="text-fluid-lg max-w-3xl mx-auto text-muted-foreground">
              We integrate performant, organic WebGL shaders directly connected to our design system's CSS variables. Here is how they enhance the experience across different sections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dune Shader Plan */}
            <div className="organic-radius-lg overflow-hidden flex flex-col h-[400px] shadow-md organic-section-top-alt">
              <div className="relative h-48 w-full flex-shrink-0">
                <WebGLGraphics variant="dunes" colorVar1="--organic-sunset-primary" colorVar2="--organic-sunset-accent" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none drop-shadow-md">
                  <h3 className="text-fluid-2xl font-bold text-primary-foreground">Hero Dunes</h3>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <h4 className="text-fluid-xl mb-2">Top Sections</h4>
                <p className="text-fluid-base text-muted-foreground">
                  A slow, shifting fluid distortion map mimicking wind over sand dunes or slow-moving water. Behind hero text, using the "Savanna Sunset" palette.
                </p>
              </div>
            </div>

            {/* Waves Shader Plan */}
            <div className="organic-radius-lg overflow-hidden flex flex-col h-[400px] shadow-md organic-section-middle-alt">
              <div className="relative h-48 w-full flex-shrink-0">
                <WebGLGraphics variant="waves" colorVar1="--organic-clay-primary" colorVar2="--organic-clay-accent" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none drop-shadow-md">
                  <h3 className="text-fluid-2xl font-bold text-primary-foreground">Transition Waves</h3>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <h4 className="text-fluid-xl mb-2">Middle Sections</h4>
                <p className="text-fluid-base text-muted-foreground">
                  Gently undulating waves that separate major page sections dynamically. This replaces static SVG dividers for a more organic feel.
                </p>
              </div>
            </div>

            {/* Particles Shader Plan */}
            <div className="organic-radius-lg overflow-hidden flex flex-col h-[400px] shadow-md organic-section-bottom-alt">
              <div className="relative h-48 w-full flex-shrink-0 bg-background">
                <WebGLGraphics variant="particles" colorVar1="--organic-earth-accent" colorVar2="--organic-earth-primary" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none drop-shadow-md">
                  <h3 className="text-fluid-2xl font-bold text-primary-foreground">Ambient Particles</h3>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <h4 className="text-fluid-xl mb-2">Footer / Dark Mode</h4>
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
      <section className="organic-section-middle py-section-lg">
        <Container>
          {/* Handwritten accent heading (use sparingly!) */}
          <div className="text-center mb-12">
            <h2 className="text-fluid-4xl mb-4 wp-text--hand">
              Featured Adventures
            </h2>
            <p className="text-fluid-lg max-w-3xl mx-auto text-muted-foreground">
              Curated experiences that blend adventure, comfort, and authentic cultural immersion.
            </p>
          </div>

          {/* Card Grid with organic styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOURS.slice(0, 3).map((tour) => (
              <div
                key={tour.id}
                className="organic-radius-lg p-6 transition-transform hover:scale-[1.02] shadow-md bg-card"
              >
                {/* Tour image */}
                {tour.image && (
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="organic-radius-md w-full h-48 object-cover mb-4"
                  />
                )}

                {/* Tour content */}
                <h3 className="text-fluid-2xl mb-2 text-foreground">
                  {tour.title}
                </h3>
                <p className="text-fluid-base mb-4 text-muted-foreground">
                  {tour.excerpt}
                </p>

                {/* Organic pebble button */}
                <button className="organic-pebble px-6 py-3 font-medium transition-transform hover:scale-105 bg-primary text-primary-foreground">
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
      <section className="organic-section-middle-alt py-section-lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-fluid-4xl mb-6 text-foreground">
                Why Choose Acacia Drift?
              </h2>
              <p className="text-fluid-lg mb-6 text-muted-foreground">
                We craft unforgettable safari experiences with deep respect for nature and local communities.
              </p>

              {/* Feature list */}
              <ul className="space-y-4">
                {[
                  { title: 'Expert Guides', desc: 'Local knowledge and wildlife expertise' },
                  { title: 'Sustainable Travel', desc: 'Eco-conscious tours that give back' },
                  { title: 'Small Groups', desc: 'Intimate experiences, maximum impact' },
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 bg-primary text-primary-foreground">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-fluid-xl font-semibold mb-1 text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-fluid-base text-muted-foreground">
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
      <section className="organic-section-middle py-section-lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-fluid-4xl mb-4 text-foreground">
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
      <section className="organic-section-bottom py-section-lg">
        <Container>
          {/* CTA with organic styling */}
          <div className="organic-radius-xl p-12 text-center bg-card shadow-lg">
            <h2 className="text-fluid-4xl mb-4 wp-text--hand text-foreground">
              Ready for Your Adventure?
            </h2>
            <p className="text-fluid-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
              Let's create your dream safari experience together.
            </p>

            {/* Organic pebble CTA button */}
            <button className="organic-pebble px-8 py-4 text-lg font-medium transition-transform hover:scale-105 bg-primary text-primary-foreground shadow-md">
              Start Planning
            </button>
          </div>

          {/* Decorative flourish (handwritten font - very sparingly!) */}
          <p className="text-center mt-8 text-fluid-sm text-muted-foreground" style={{ fontFamily: 'var(--font-family-shadows)' }}>
            Est. 2024
          </p>
        </Container>
      </section>
    </div>
  );
}
