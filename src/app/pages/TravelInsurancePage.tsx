/**
 * Travel Insurance Information Page - PATTERN-BASED VERSION
 * 
 * Comprehensive travel insurance information with partner recommendations,
 * coverage details, and educational content to reduce booking friction.
 * Now uses PageShell for centralized breadcrumbs + hero.
 * 
 * @module TravelInsurancePage
 * @category pages
 * @conversionPage true
 */

import { PageShell } from "../components/parts/PageShell";
import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { WhyChooseUsPattern } from "../components/patterns/WhyChooseUsPattern";
import { HighlightsGridPattern } from "../components/patterns/HighlightsGridPattern";
import { PricingSectionPattern } from "../components/patterns/PricingSectionPattern";
import { 
  Shield, 
  Heart,
  AirplaneTilt as Plane,
  Warning as AlertTriangle,
  CheckCircle as CircleCheck,
  XCircle as CircleX,
  ArrowSquareOut as ExternalLink,
  FileText,
  MapPin,
} from "@phosphor-icons/react";
import { 
  INSURANCE_PROVIDERS,
  INSURANCE_PLANS,
  INSURANCE_SCENARIOS,
  INSURANCE_REQUIREMENTS
} from "../data/insurance";

/**
 * Why insurance is essential (benefits)
 */
const WHY_INSURANCE_BENEFITS = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Medical Protection",
    description: "Coverage for medical emergencies, hospitalization, and evacuation from remote safari locations"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Financial Security",
    description: "Protect your investment with trip cancellation and interruption coverage"
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "24/7 Assistance",
    description: "Emergency hotline for medical referrals, evacuation coordination, and travel support"
  }
];

/**
 * What's covered (coverage types)
 */
const COVERAGE_HIGHLIGHTS = [
  {
    id: "coverage-medical",
    icon: <Heart className="h-6 w-6" />,
    title: "Medical Emergencies",
    description: "Coverage for medical treatment, hospitalization, and emergency care while traveling"
  },
  {
    id: "coverage-evacuation",
    icon: <Plane className="h-6 w-6" />,
    title: "Medical Evacuation",
    description: "Emergency medical evacuation to nearest adequate facility or home country"
  },
  {
    id: "coverage-cancellation",
    icon: <CircleX className="h-6 w-6" />,
    title: "Trip Cancellation",
    description: "Reimbursement if you need to cancel your trip for covered reasons"
  },
  {
    id: "coverage-interruption",
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Trip Interruption",
    description: "Coverage if you need to cut your trip short due to emergency"
  },
  {
    id: "coverage-baggage",
    icon: <FileText className="h-6 w-6" />,
    title: "Baggage Loss/Delay",
    description: "Compensation for lost, stolen, or delayed luggage and personal items"
  },
  {
    id: "coverage-adventure",
    icon: <MapPin className="h-6 w-6" />,
    title: "Adventure Activities",
    description: "Coverage for safari activities, wildlife viewing, and outdoor adventures"
  }
];

/**
 * Real coverage examples (scenarios) — data-driven from insurance.ts
 */
const SCENARIO_HIGHLIGHTS = INSURANCE_SCENARIOS.map((scenario, index) => ({
  id: scenario.id || `scenario-${index}`,
  icon: scenario.covered ? (
    <CircleCheck className="h-6 w-6" />
  ) : (
    <CircleX className="h-6 w-6" />
  ),
  title: scenario.title,
  description: `${scenario.description}\n\n**Cost:** ${scenario.cost}\n**Status:** ${scenario.covered ? '✓ Covered' : '✗ Not Covered'}\n\n${scenario.details}`
}));

/**
 * Insurance FAQs
 */
const FAQ_INSURANCE = [
  {
    id: "faq-insurance-1",
    question: "Is travel insurance required for African safaris?",
    answer: "While not always legally required, we strongly recommend travel insurance for all African safari trips. Medical evacuation costs can exceed $50,000, and many safari destinations have limited medical facilities. Insurance provides essential financial protection and peace of mind.",
    category: "insurance"
  },
  {
    id: "faq-insurance-2",
    question: "What does safari travel insurance typically cover?",
    answer: "Comprehensive safari insurance covers medical emergencies, medical evacuation, trip cancellation/interruption, baggage loss/delay, and adventure activities. Look for policies that specifically include safari activities and wildlife viewing.",
    category: "insurance"
  },
  {
    id: "faq-insurance-3",
    question: "When should I purchase travel insurance?",
    answer: "Purchase insurance as soon as you book your safari. This ensures coverage for pre-departure events like illness or family emergencies. Some benefits, like pre-existing condition waivers, require purchase within 14-21 days of initial trip deposit.",
    category: "insurance"
  },
  {
    id: "faq-insurance-4",
    question: "Are safari activities covered by standard policies?",
    answer: "Not always. Many standard policies exclude 'adventure activities.' Choose a policy that explicitly covers safari activities, wildlife viewing, and outdoor adventures. World Nomads and similar adventure-focused providers typically include these activities.",
    category: "insurance"
  },
  {
    id: "faq-insurance-5",
    question: "What if I have pre-existing medical conditions?",
    answer: "Many policies offer pre-existing condition waivers if purchased within 14-21 days of your initial trip deposit. Premium plans may include coverage for stable, controlled conditions. Always disclose pre-existing conditions when purchasing insurance.",
    category: "insurance"
  },
  {
    id: "faq-insurance-6",
    question: "How much does safari travel insurance cost?",
    answer: "Costs typically range from 4-10% of your trip cost. For a $10,000 safari, expect to pay $400-1,000 depending on coverage level, age, and trip duration. Comprehensive coverage with medical evacuation is recommended for African safaris.",
    category: "insurance"
  }
];

/**
 * Requirements FAQ (formatted as FAQ for accordion display)
 */
const FAQ_REQUIREMENTS = INSURANCE_REQUIREMENTS.map(req => ({
  id: req.id,
  question: `${req.destination} - ${req.mandatory ? 'Mandatory' : 'Recommended'}`,
  answer: `${req.description}\n\n**Recommended Coverage:**\n${req.recommendedCoverage.map(c => `• ${c}`).join('\n')}`,
  category: "requirements"
}));

/**
 * Insurance Provider Card Component
 */
function InsuranceProviderCard({ provider }: { provider: typeof INSURANCE_PROVIDERS[0] }) {
  return (
    <article 
      className={`bg-card border rounded-[var(--radius-lg)] p-element-xl relative flex flex-col gap-fluid-md ${
        provider.recommended ? 'ring-2 ring-primary' : ''
      }`}
    >
      {provider.recommended && (
        <div className="absolute -top-[var(--spacing-element-sm)] left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-element-sm py-element-xs rounded-[var(--radius-full)] text-[length:var(--text-xs)] font-[family-name:var(--font-family-noto-sans)]">
            Recommended
          </span>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-fluid-md">
          <div className="h-[48px] w-[48px] rounded-[var(--radius-full)] bg-primary/10 flex items-center justify-center text-primary">
            {provider.logo}
          </div>
          <div>
            <h3 className="m-0">{provider.name}</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(provider.rating) ? "text-accent" : "text-muted"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground">
                {provider.rating} ({provider.reviewCount.toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="m-0">
        From {provider.startingPrice}
        <span className="text-[length:var(--text-sm)] text-muted-foreground font-[family-name:var(--font-family-noto-sans)]"> / week</span>
      </p>

      <ul className="flex flex-col gap-element-sm m-0">
        {provider.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-fluid-sm text-[length:var(--text-sm)] font-[family-name:var(--font-family-noto-sans)]">
            <CircleCheck className="h-4 w-4 text-primary flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={provider.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-10 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-fluid-sm font-[family-name:var(--font-family-noto-sans)] font-[var(--font-weight-medium)] text-[length:var(--text-sm)]"
      >
        Get Quote
        <ExternalLink className="h-4 w-4" />
      </a>
    </article>
  );
}

/**
 * Travel Insurance Page Component
 */
export function TravelInsurancePage() {
  return (
    <PageShell context="travel-insurance">
      {/* Why Insurance Matters */}
      <WhyChooseUsPattern
        title="Why Travel Insurance Is Essential"
        description="African safaris are remote adventures. Medical facilities can be hours away, and evacuation costs can exceed $50,000. Insurance provides financial protection and 24/7 emergency assistance when you need it most."
        benefits={WHY_INSURANCE_BENEFITS}
        variant="default"
      />

      {/* What's Covered */}
      <HighlightsGridPattern
        title="What's Covered"
        description="Comprehensive protection for your safari adventure"
        highlights={COVERAGE_HIGHLIGHTS}
        columns={3}
        variant="cards"
      />

      {/* Recommended Providers */}
      <section className="py-section-md bg-muted/30">
        <Container>
          <div className="text-center flex flex-col gap-fluid-sm pb-fluid-lg">
            <h2 className="m-0">How it works</h2>
            <p className="text-muted-foreground max-w-2xl m-0">
              We've partnered with trusted providers that specialize in adventure and safari travel coverage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-fluid-lg">
            {INSURANCE_PROVIDERS.map((provider) => (
              <InsuranceProviderCard key={provider.id} provider={provider} />
            ))}
          </div>

          <div className="pt-fluid-lg">
            <div className="wp-bg-accent-ultralight border wp-border-accent-soft rounded-[var(--radius-lg)] p-element-xl text-center">
              <p className="text-[length:var(--text-sm)] m-0 font-[family-name:var(--font-family-noto-sans)]">
                <strong>Note:</strong> These are affiliate links. Purchasing through our partners 
                helps support our service at no additional cost to you. We only recommend providers 
                we trust and use ourselves.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Coverage Comparison */}
      <PricingSectionPattern
        title="Compare Coverage Levels"
        description="Choose the protection level that's right for your trip"
        plans={INSURANCE_PLANS.map(plan => ({
          id: plan.id,
          name: plan.name,
          price: plan.price,
          description: `Medical: ${plan.coverage.medical} | Evacuation: ${plan.coverage.evacuation}`,
          features: plan.features,
          highlighted: plan.recommended,
          ctaLabel: "Learn More",
          ctaLink: "#"
        }))}
      />

      {/* Real Coverage Examples */}
      <HighlightsGridPattern
        title="Real Coverage Examples"
        description="See how travel insurance protects you in real-world scenarios"
        highlights={SCENARIO_HIGHLIGHTS}
        columns={2}
        variant="minimal"
      />

      {/* Insurance FAQs */}
      <FAQ
        items={FAQ_INSURANCE}
        title="Travel Insurance Questions"
        intro="Common questions about safari travel insurance"
      />

      {/* Requirements by Destination */}
      <section className="py-section-md bg-muted/30">
        <Container>
          <div className="text-center flex flex-col gap-fluid-sm">
            <h2 className="m-0">Frequently asked questions</h2>
            <p className="text-center text-muted-foreground m-0 pb-fluid-xl">
              Understand insurance needs for different safari destinations
            </p>
            
            <FAQ
              items={FAQ_REQUIREMENTS}
              title=""
              intro=""
            />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to Book Your Safari?"
        description="Get travel insurance, then book your adventure with confidence"
        primaryAction={{ label: "Browse Safari Tours", href: "/tours" }}
        secondaryAction={{ label: "Request Custom Quote", href: "/quote-request" }}
      />
    </PageShell>
  );
}

export default TravelInsurancePage;