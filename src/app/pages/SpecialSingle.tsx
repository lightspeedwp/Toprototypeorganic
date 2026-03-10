/**
 * Special Single Page
 * 
 * Single special offer/deal page with countdown timer and booking CTA.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useParams } from "react-router";
import { Hero } from "../components/patterns/Hero";
import { FastFacts } from "../components/patterns/FastFacts";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { EditorialContent } from "../components/patterns/EditorialContent";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { CardGrid } from "../components/patterns/CardGrid";
import { TourCard } from "../components/patterns/TourCard";
import { Container } from "../components/common/Container";
import { CountdownPattern } from "../components/patterns/CountdownPattern";
import { ALL_SPECIALS } from "../data/mockExpanded";
import { getPageSectionFAQs, TOURS } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { Tag, Calendar, Users, TrendDown as TrendingDown, Clock, CheckCircle as CircleCheck, Sparkle as Sparkles, Percent } from "@phosphor-icons/react";
import { motion } from "motion/react";

export function SpecialSingle() {
  const { slug } = useParams<{ slug: string }>();
  const { navigateToTour, navigateTo } = useNavigation();

  const special = ALL_SPECIALS.find(s => s.slug === slug) || ALL_SPECIALS[0];
  const relatedTours = TOURS.slice(0, 3);
  const faqData = getPageSectionFAQs("special-single");

  const fastFacts = [
    { icon: Percent, label: "Exclusive Benefit", value: special.discount || "Premium Rate" },
    { icon: Calendar, label: "Offer Expiry", value: new Date(special.validTo).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
    { icon: Users, label: "Inventory", value: "Strictly Limited" },
    { icon: Sparkles, label: "Category", value: "Curated Special" },
  ];

  return (
    <article className="wp-template-single-special bg-background theme-organic">
      <div className="organic-section-top">
        <BreadcrumbsPattern
          items={[
            { label: "Home", href: "/", onClick: () => navigateTo("/") },
            { label: "Exclusive Offers", href: "/specials", onClick: () => navigateTo("/specials") },
            { label: special.title, isCurrent: true },
          ]}
          fullWidth={true}
        />

        <Hero
          title={special.title}
          intro={special.excerpt}
          image={special.featuredImage}
          context="A Moment of Opportunity"
          height="large"
          primaryCTA={{ label: "Claim Exclusive Offer", onClick: () => document.getElementById('offer-details')?.scrollIntoView({ behavior: 'smooth' }) }}
          secondaryCTA={{ label: "View All Specials", onClick: () => navigateTo("/specials"), variant: "outline" }}
          animated
        />
      </div>

      <div className="organic-section-middle">
        {/* Urgency Strip */}
      <section className="bg-accent py-8 text-accent-foreground shadow-2xl relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
            <div className="flex items-center gap-[var(--spacing-gap-sm)]">
              <div className="size-12 rounded-2xl bg-accent-foreground/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-accent-foreground/20">
                <Clock className="size-6 text-accent-foreground animate-spin-slow" />
              </div>
              <div className="text-accent-foreground flex flex-col gap-[var(--spacing-gap-xs)]">
                <span className="text-xs font-bold uppercase tracking-widest opacity-70 block">Time is Essential</span>
                <span className="font-serif font-bold text-2xl md:text-3xl italic leading-none">Offer Decays Shortly</span>
              </div>
            </div>
            <div className="h-12 w-px bg-accent-foreground/20 hidden md:block" />
            <CountdownPattern 
              endDate={special.validTo} 
              variant="minimal" 
              className="bg-accent-foreground/10 rounded-2xl px-10 py-4 backdrop-blur-md border border-accent-foreground/20 shadow-inner"
            />
          </div>
        </Container>
      </section>

      <FastFacts facts={fastFacts} />

      <div id="offer-details">
        <EditorialContent
          title="Privilege & Perspective"
          subtitle={`The architectural details of your ${special.discount || 'exclusive'} benefit.`}
          content={special.content || special.excerpt}
          animated
        />
      </div>

      <section className="py-section-lg bg-muted/10 border-y-2 border-border/50">
        <Container maxWidth="narrow">
          <div className="text-center flex flex-col items-center gap-[var(--spacing-gap-sm)] pb-[var(--spacing-gap-lg)]">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block">Value Added</span>
            <h2 className="text-4xl font-bold font-serif m-0">Inclusions & Advantages</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "Preferential Booking Protocols",
              "Exclusive Airport Concierge",
              "Wilderness Estate Upgrades",
              "Dedicated Expedition Support",
              "Adaptive Reservation Terms",
              "Priority Access to Hide Sites"
            ].map((benefit, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-6 rounded-2xl bg-card border-2 border-border shadow-sm group hover:border-primary transition-all duration-500"
              >
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <CircleCheck className="size-5" />
                </div>
                <span className="font-bold text-foreground text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-section-lg">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end gap-[var(--spacing-gap-lg)] pb-[var(--spacing-gap-lg)]">
            <div className="max-w-2xl flex flex-col gap-[var(--spacing-gap-xs)]">
              <span className="text-xs font-bold uppercase tracking-widest text-primary block">Curation</span>
              <h2 className="text-4xl font-bold font-serif m-0">Applicable Expeditions</h2>
              <p className="text-muted-foreground text-lg m-0">This privilege is extended across our most coveted journeys.</p>
            </div>
          </div>
          <CardGrid columns={3} animated>
            {relatedTours.map(tour => (
              <TourCard
                key={tour.id}
                tour={tour}
                onClick={() => navigateToTour(tour.slug)}
              />
            ))}
          </CardGrid>
        </Container>
      </section>
      </div>

      <div className="organic-section-bottom">
        <FAQ
          items={faqData?.items || []}
          title="Protocol FAQ"
          intro="Technical details regarding our seasonal incentives and acquisition terms."
        />

        <CTA
          title="Command Your Experience"
          description="Limited availability dictates that these offers are secured on a first-come basis. Ensure your place in the wilderness today."
          variant="default"
          primaryAction={{ label: "Request Allocation", onClick: () => navigateTo("/contact") }}
          secondaryAction={{ label: "Talk to a Specialist", onClick: () => navigateTo("/contact") }}
        />
      </div>
    </article>
  );
}

export default SpecialSingle;