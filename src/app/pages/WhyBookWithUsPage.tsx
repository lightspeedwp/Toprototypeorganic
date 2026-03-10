/**
 * Why Book With Us Page
 * 
 * High-conversion trust-building page that addresses customer objections,
 * showcases differentiators, and builds confidence in booking.
 * Now uses PageShell for centralized breadcrumbs + hero.
 *
 * @module WhyBookWithUsPage
 * @category pages
 */

import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { StatisticsMetricsPattern } from "../components/patterns/StatisticsMetricsPattern";
import { WhyChooseUsPattern } from "../components/patterns/WhyChooseUsPattern";
import { PageShell } from "../components/parts/PageShell";
import { HeadingBlock } from "../components/blocks/core/HeadingBlock";
import { ParagraphBlock } from "../components/blocks/core/ParagraphBlock";
import { useNavigation } from "../contexts/NavigationContext";
import { 
  Shield, 
  Medal as Award, 
  Users, 
  Clock, 
  Globe, 
  Heart,
  Star,
  ShieldCheck,
  Check,
  Lightning as Zap,
  Leaf,
  MapPin,
  CheckCircle as CircleCheck
} from "@phosphor-icons/react";

export function WhyBookWithUsPage() {
  const { navigateTo } = useNavigation();

  return (
    <PageShell context="why-book-with-us">
      {/* Trust Pillars */}
      <section className="py-section-lg bg-card border-b border-border/50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-10 rounded-3xl bg-muted/20 border-2 border-border/50 hover:border-primary transition-all duration-500 flex flex-col items-center gap-[var(--spacing-gap-md)]">
              <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Shield className="size-8" />
              </div>
              <h3>Financial Protection</h3>
              <p className="text-muted-foreground leading-relaxed">Your investment is 100% protected through our comprehensive bonding and secure trust accounts.</p>
            </div>
            <div className="text-center p-10 rounded-3xl bg-muted/20 border-2 border-border/50 hover:border-primary transition-all duration-500 flex flex-col items-center gap-[var(--spacing-gap-md)]">
              <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Award className="size-8" />
              </div>
              <h3>Field Expertise</h3>
              <p className="text-muted-foreground leading-relaxed">Speak directly with designers who spend months each year in the African bush personally vetting every lodge.</p>
            </div>
            <div className="text-center p-10 rounded-3xl bg-muted/20 border-2 border-border/50 hover:border-primary transition-all duration-500 flex flex-col items-center gap-[var(--spacing-gap-md)]">
              <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Users className="size-8" />
              </div>
              <h3>Verified Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">A consistent 4.9/5 satisfaction rating from our global community of over 15,000 happy travelers.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Differentiators */}
      <WhyChooseUsPattern
        title="The Lightspeed Difference"
        description="We don't just book trips; we architect memories. Here is how we ensure your journey is extraordinary."
        features={[
          {
            title: "Native Narratives",
            description: "Our guides are storytellers and educators, providing deep context on ecology and local culture.",
            icon: Globe,
          },
          {
            title: "Bespoke Geometry",
            description: "No templates. Every itinerary is built from a blank slate based on your curiosity and pace.",
            icon: Zap,
          },
          {
            title: "Guardian Support",
            description: "24/7 dedicated support team on the ground across 12 countries to handle every contingency.",
            icon: ShieldCheck,
          },
          {
            title: "Eco-Advocacy",
            description: "A portion of every booking goes directly to community healthcare and wildlife protection units.",
            icon: Leaf,
          },
        ]}
        className="bg-background"
      />

      {/* Stats */}
      <StatisticsMetricsPattern
        title="Impact in Motion"
        description="Our legacy is measured in stories told and ecosystems preserved."
        statistics={[
          { value: "20", label: "Years of Heritage", icon: Clock },
          { value: "15k", label: "Safari Alumnae", icon: Users },
          { value: "12", label: "Core Destinations", icon: MapPin },
          { value: "98%", label: "Repeat Intention", icon: Heart },
        ]}
        className="bg-muted/30 border-y border-border/50"
      />

      {/* The Promise Grid */}
      <section className="py-section-lg bg-card">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                <CircleCheck className="size-6" />
              </div>
              <h2>Our Unwavering Promises</h2>
              <ParagraphBlock className="text-muted-foreground">
                When you entrust us with your time and resources, we make these four commitments 
                the bedrock of our relationship.
              </ParagraphBlock>
              
              <div className="grid gap-6">
                {[
                  { t: "Transparent Pricing", d: "No hidden local payments or surprise surcharges. Your quote is the total price." },
                  { t: "Flexible Commitment", d: "Change your dates up to 60 days before travel with zero administration fees." },
                  { t: "The 'Native' Standard", d: "We only use lodges that pass our strict criteria for sustainability and service." }
                ].map((p, i) => (
                  <div key={i} className="flex gap-4 group items-start">
                    <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Check className="size-3" />
                    </div>
                    <div className="flex flex-col gap-[var(--spacing-gap-xs)]">
                      <h5 className="text-foreground m-0">{p.t}</h5>
                      <p className="text-muted-foreground text-sm leading-relaxed m-0">{p.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1000" 
                  alt="African landscape" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" 
                />
              </div>
              <div className="absolute -bottom-8 -left-8 p-8 rounded-2xl bg-primary text-primary-foreground shadow-xl hidden md:block max-w-xs flex flex-col gap-[var(--spacing-gap-sm)]">
                <Star className="size-8 fill-primary-foreground" />
                <p className="italic m-0">"The attention to detail was beyond anything we've experienced in 30 years of travel."</p>
                <p className="text-xs uppercase tracking-widest opacity-80 m-0">— The Harrison Family</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust FAQ */}
      <FAQ 
        title="Clarifying the Journey"
        intro="Direct answers to the most common questions about booking, safety, and logistics."
        items={[
          {
            id: "faq-1",
            question: "Is my payment secure?",
            answer: "Yes, we use industry-standard encryption and our bonded status ensures your funds are protected until your travel is completed.",
          },
          {
            id: "faq-2",
            question: "Can I speak with a past traveler?",
            answer: "Absolutely. We can connect you with members of our Alumnae network who have visited the specific regions you are interested in.",
          }
        ]}
      />

      {/* CTA */}
      <CTA
        title="Your Dream Safari Starts with a Conversation"
        description="Our designers are ready to help you map out the perfect itinerary. No obligation, just pure expertise."
        variant="gradient"
        primaryAction={{
          label: "Connect with a Designer",
          onClick: () => navigateTo("/contact")
        }}
        secondaryAction={{
          label: "Try Our Trip Planner",
          onClick: () => navigateTo("/trip-planner")
        }}
      />
    </PageShell>
  );
}

export default WhyBookWithUsPage;
