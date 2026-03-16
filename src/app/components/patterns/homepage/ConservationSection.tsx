/**
 * Conservation Section for the homepage.
 *
 * Highlights the tour operator's commitment to sustainability and conservation.
 *
 * **WordPress CSS:**
 * Uses BEM classes from `/src/styles/patterns/conservation-section.css`
 *
 * @module ConservationSection
 * @category components/patterns/homepage
 */

import { Container } from "../../common/Container";
import { HeadingBlock } from "../../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../../blocks/core/ParagraphBlock";
import { Button } from "../../blocks/design/Button";
import { Heart, Shield, Leaf, Globe, ArrowRight } from "@phosphor-icons/react";
import { motion as Motion } from "motion/react";

interface ConservationSectionProps {
  onNavigate: (path: string) => void;
}

export function ConservationSection({ onNavigate }: ConservationSectionProps) {
  const highlights = [
    { title: "Wildlife First", icon: Shield, desc: "Dedicated anti-poaching units funded by your visits." },
    { title: "Eco-Luxe", icon: Leaf, desc: "Hand-picked lodges with zero-carbon footprints." },
    { title: "Legacy", icon: Heart, desc: "Every booking supports local education initiatives." }
  ];

  return (
    <section className="wp-pattern-conservation">
      {/* Decorative Element */}
      <div className="wp-pattern-conservation__decoration" />

      <Container>
        <div className="wp-pattern-conservation__grid">
          {/* Content */}
          <div className="wp-pattern-conservation__content">
            <div className="wp-pattern-conservation__eyebrow">
              <Globe className="wp-pattern-conservation__eyebrow-icon" />
              Our Global Responsibility
            </div>

            <HeadingBlock level={2} className="wp-pattern-conservation__title">
              Travel that Leaves a <span className="wp-pattern-conservation__title-accent">Legacy</span>
            </HeadingBlock>

            <ParagraphBlock className="wp-pattern-conservation__description">
              We don't just show you Africa; we help you protect it. A portion of every expedition
              is directly reinvested into the communities and wildlife that make these
              landscapes so extraordinary.
            </ParagraphBlock>

            <div className="wp-pattern-conservation__highlights">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="wp-pattern-conservation__highlight"
                  >
                    <div className="wp-pattern-conservation__highlight-icon-wrapper">
                      <Icon className="wp-pattern-conservation__highlight-icon" />
                    </div>
                    <div>
                      <HeadingBlock level={4} className="wp-pattern-conservation__highlight-title">
                        {item.title}
                      </HeadingBlock>
                      <p className="wp-pattern-conservation__highlight-desc">{item.desc}</p>
                    </div>
                  </Motion.div>
                );
              })}
            </div>

            <div className="wp-pattern-conservation__cta">
              <Button
                onClick={() => onNavigate("/sustainability")}
              >
                Explore Our Impact
                <ArrowRight className="wp-card__action-icon" />
              </Button>
            </div>
          </div>

          {/* Visuals */}
          <div className="wp-pattern-conservation__visuals">
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="wp-pattern-conservation__image-wrapper"
            >
              <img
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1000"
                alt="Conservation in Africa"
                className="wp-pattern-conservation__image"
                loading="lazy"
              />
              <div className="wp-pattern-conservation__image-gradient" />
              <div className="wp-pattern-conservation__quote">
                <p className="wp-pattern-conservation__quote-text">
                  "True discovery lies not in seeking new landscapes, but in having new eyes."
                </p>
                <p className="wp-pattern-conservation__quote-attribution">— Safari Ethos</p>
              </div>
            </Motion.div>

            {/* Floating Achievement Card */}
            <Motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="wp-pattern-conservation__achievement"
            >
              <div className="wp-pattern-conservation__achievement-icon-wrapper">
                <Shield className="wp-pattern-conservation__achievement-icon" />
              </div>
              <p className="wp-pattern-conservation__achievement-value">1.5M+</p>
              <p className="wp-pattern-conservation__achievement-label">
                Acres of habitat protected through tourism
              </p>
            </Motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ConservationSection;