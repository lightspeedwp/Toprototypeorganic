/**
 * Sustainability & Conservation Page
 * 
 * Showcases the tour operator's commitment to conservation and community development.
 * Now uses PageShell for centralized breadcrumbs + hero.
 * 
 * @module SustainabilityPage
 * @category pages
 */

import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { PageShell } from "../components/parts/PageShell";
import { SustainabilityPattern } from "../components/patterns/SustainabilityPattern";
import { CONSERVATION_PROJECTS, SUSTAINABILITY_COMMITMENTS } from "../data/sustainability";
import { getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { Heart, Shield, Users, Leaf } from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function SustainabilityPage() {
  const { navigateTo } = useNavigation();
  const faqData = getPageSectionFAQs("sustainability");

  const impactStats = [
    { label: "Community", value: "45,000+", suffix: "People Impacted", icon: Users },
    { label: "Conservation", value: "1.5M+", suffix: "Acres Protected", icon: Shield },
    { label: "Environment", value: "250K+", suffix: "Trees Planted", icon: Leaf },
    { label: "Impact", value: "100%", suffix: "Sustainable Stays", icon: Heart },
  ];

  return (
    <PageShell context="sustainability" className="theme-organic">
      <div className="organic-section-top">
        {/* Impact Statistics */}
        <section className="py-section-lg border-b border-border/50 bg-muted/20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {impactStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center flex flex-col items-center gap-fluid-sm"
                  >
                    <div className="size-16 rounded-[var(--radius-lg)] bg-primary/10 text-primary flex items-center justify-center shadow-sm">
                      <Icon className="size-8" />
                    </div>
                    <p className="text-fluid-4xl text-primary wp-text--hand m-0">{stat.value}</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground m-0">{stat.suffix}</p>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>
      </div>

      <div className="organic-section-middle">
        {/* Core Sustainability Content */}
        <SustainabilityPattern
          projects={CONSERVATION_PROJECTS}
          commitments={SUSTAINABILITY_COMMITMENTS}
        />
      </div>

      <div className="organic-section-middle-alt">
        {/* Narrative Section */}
        <section className="py-section-lg bg-card border-y-2 border-border/50">
          <Container maxWidth="narrow">
            <div className="text-center flex flex-col gap-fluid-lg pb-fluid-lg">
              <h2 className="wp-text--hand m-0">Traveling with Purpose</h2>
            <div className="flex flex-col gap-6 text-muted-foreground text-left">
              <p>
                We believe that travel is more than just seeing new places; it's about connecting with 
                humanity and the natural world in a way that creates a positive, lasting legacy. 
                Every journey we craft is built on the principle of "net positive travel."
              </p>
              <p>
                When you choose to explore Africa with us, you're not just a visitor; you're a vital 
                partner in protecting the continent's most precious assets. We dedicate a percentage 
                of every booking to the Lion Recovery Fund and local community health clinics.
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="pt-16 p-12 rounded-5xl bg-background border-2 border-primary shadow-2xl relative overflow-hidden flex flex-col gap-fluid-md"
            >
              <div className="absolute top-0 right-0 p-element-xl opacity-10">
                <Heart className="size-32 text-primary" />
              </div>
              <h3 className="m-0">Our Ethical Promise</h3>
              <p className="text-fluid-lg m-0">
                "We promise to never disrupt wildlife for a better photo, to always respect local traditions, 
                and to ensure your presence in Africa is a gift to the land and its people."
              </p>
              <div className="flex items-center justify-center gap-4 pt-fluid-sm">
                <div className="h-px w-12 bg-primary" />
                <span className="text-[length:var(--text-xs)] uppercase tracking-widest text-primary font-[family-name:var(--font-family-noto-sans)]">Signed, The Leadership Team</span>
                <div className="h-px w-12 bg-primary" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
      </div>

      <div className="organic-section-bottom">
        <FAQ
          title="Responsible Travel FAQ"
          subtitle="Learn how you can contribute to conservation during your expedition."
          items={faqData?.items}
        />

        <CTA
          variant="default"
          title="Be Part of the Solution"
          description="Every safari booked with us directly funds a conservation project of your choice. Join us in making a difference while exploring the wild heart of Africa."
          primaryAction={{
            label: "Start Planning Your Purposeful Journey",
            onClick: () => navigateTo("/contact")
          }}
          secondaryAction={{
            label: "View All Destinations",
            onClick: () => navigateTo("/destinations")
          }}
        />
      </div>
    </PageShell>
  );
}