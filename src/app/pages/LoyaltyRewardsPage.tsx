/**
 * Loyalty & Rewards Page
 * 
 * Displays the safari loyalty programme with tier levels,
 * benefits, and how-it-works steps.
 * 
 * @module LoyaltyRewardsPage
 * @category pages
 */

import { Star, Crown, Diamond, Trophy, Check, ArrowRight, Gift, Percent, Headphones, Airplane } from "@phosphor-icons/react";
import { Hero } from "../components/patterns/Hero";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Container } from "../components/common/Container";
import { FAQ_GENERAL } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";

const TIERS = [
  {
    id: "bronze",
    name: "Explorer",
    icon: Star,
    requirement: "First booking",
    description: "Begin your journey with us and start earning rewards from your very first safari.",
    benefits: [
      "5% off your second safari",
      "Priority email support",
      "Complimentary destination guide",
      "Birthday month special offer",
      "Early access to new tours",
    ],
    featured: false,
  },
  {
    id: "silver",
    name: "Pathfinder",
    icon: Crown,
    requirement: "2+ safaris or $10,000+ spent",
    description: "Recognised travellers who have experienced the magic of Africa and keep coming back for more.",
    benefits: [
      "8% off all future bookings",
      "Complimentary airport lounge access",
      "Priority phone support",
      "Free room upgrade (subject to availability)",
      "Exclusive Pathfinder newsletter",
      "Invite to annual traveller event",
      "Complimentary travel insurance quote",
    ],
    featured: true,
  },
  {
    id: "gold",
    name: "Legend",
    icon: Diamond,
    requirement: "5+ safaris or $25,000+ spent",
    description: "Our most valued guests who have truly explored the breadth and depth of African travel.",
    benefits: [
      "12% off all future bookings",
      "Dedicated personal travel consultant",
      "Guaranteed room upgrade",
      "Complimentary spa treatment per trip",
      "VIP airport meet & greet",
      "Exclusive Legend-only departures",
      "Annual complimentary night at partner lodge",
      "Priority waitlist for sold-out tours",
    ],
    featured: false,
  },
];

const HOW_IT_WORKS = [
  {
    id: "step-1",
    step: 1,
    title: "Book Your Safari",
    description: "Reserve any tour from our collection and you're automatically enrolled in the programme.",
  },
  {
    id: "step-2",
    step: 2,
    title: "Earn Points",
    description: "Earn 1 point per $1 spent on tours, accommodation, and add-on experiences.",
  },
  {
    id: "step-3",
    step: 3,
    title: "Unlock Tiers",
    description: "Progress through Explorer, Pathfinder, and Legend tiers as you travel more.",
  },
  {
    id: "step-4",
    step: 4,
    title: "Enjoy Rewards",
    description: "Redeem points for discounts, upgrades, exclusive experiences, and partner perks.",
  },
];

const LOYALTY_FAQS = [
  {
    id: "lf-1",
    question: "How do I join the loyalty programme?",
    answer: "You're automatically enrolled when you book your first safari with us. There's no registration form or membership fee.",
    category: "loyalty",
  },
  {
    id: "lf-2",
    question: "Do my points expire?",
    answer: "Points remain active for 36 months from your last booking. Any new booking resets the clock on all your points.",
    category: "loyalty",
  },
  {
    id: "lf-3",
    question: "Can I share my tier status with family?",
    answer: "Yes! Pathfinder and Legend members can extend their tier benefits to immediate family members travelling on the same booking.",
    category: "loyalty",
  },
  {
    id: "lf-4",
    question: "What happens if I reach Legend status?",
    answer: "Legend members receive our highest level of benefits, including a dedicated personal consultant, guaranteed upgrades, and access to exclusive departure dates.",
    category: "loyalty",
  },
];

function LoyaltyRewardsPage() {
  const { navigateTo } = useNavigation();

  return (
    <article className="wp-page-loyalty">
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: "Loyalty & Rewards" },
        ]}
        fullWidth
      />

      <Hero
        title="Safari Rewards Programme"
        intro="The more you explore, the more you earn. Join our loyalty programme and unlock exclusive benefits, discounts, and once-in-a-lifetime experiences with every safari."
        image="https://images.unsplash.com/photo-1623743424601-12be3807f99b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBhZnJpY2FuJTIwc2F2YW5uYWglMjB3aWxkbGlmZXxlbnwxfHx8fDE3NzMzMjIxMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
        context="Loyalty & Rewards"
        height="medium"
        overlay="medium"
      />

      {/* Stats */}
      <section className="wp-page-taxonomy-hub__stats">
        <Container>
          <div className="wp-page-taxonomy-hub__stats-grid">
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">3</span>
              <span className="wp-page-taxonomy-hub__stat-label">Reward Tiers</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">12%</span>
              <span className="wp-page-taxonomy-hub__stat-label">Max Discount</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">Free</span>
              <span className="wp-page-taxonomy-hub__stat-label">To Join</span>
            </div>
            <div className="wp-page-taxonomy-hub__stat">
              <span className="wp-page-taxonomy-hub__stat-value">$1 = 1pt</span>
              <span className="wp-page-taxonomy-hub__stat-label">Earn Rate</span>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="wp-page-loyalty__how-it-works">
        <Container>
          <div className="wp-page-taxonomy-hub__intro-inner">
            <span className="wp-page-taxonomy-hub__intro-eyebrow">How It Works</span>
            <h2>Four Simple Steps to Safari Rewards</h2>
          </div>
          <div className="wp-page-loyalty__steps-grid">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.id} className="wp-page-loyalty__step">
                <span className="wp-page-loyalty__step-number">{step.step}</span>
                <h3 className="wp-page-loyalty__step-title">{step.title}</h3>
                <p className="wp-page-loyalty__step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tier Cards */}
      <section className="wp-page-loyalty__tiers-section">
        <Container>
          <div className="wp-page-taxonomy-hub__intro-inner">
            <span className="wp-page-taxonomy-hub__intro-eyebrow">Membership Tiers</span>
            <h2>Choose Your Adventure Level</h2>
            <p className="wp-page-taxonomy-hub__intro-text">
              Progress through our tiers naturally as you explore more of Africa with us.
            </p>
          </div>

          <div className="wp-page-loyalty__tiers-grid">
            {TIERS.map((tier) => {
              const IconComp = tier.icon;
              return (
                <div
                  key={tier.id}
                  className={`wp-page-loyalty__tier-card${tier.featured ? " wp-page-loyalty__tier-card--featured" : ""}`}
                >
                  <div className="wp-page-loyalty__tier-icon">
                    <IconComp size={32} weight="fill" />
                  </div>
                  <h3 className="wp-page-loyalty__tier-name">{tier.name}</h3>
                  <p className="wp-page-loyalty__tier-description">{tier.description}</p>
                  <p className="wp-page-loyalty__tier-requirement">{tier.requirement}</p>
                  <div className="wp-page-loyalty__tier-benefits">
                    {tier.benefits.map((benefit, i) => (
                      <div key={`${tier.id}-b-${i}`} className="wp-page-loyalty__tier-benefit">
                        <span className="wp-page-loyalty__tier-benefit-icon">
                          <Check size={16} weight="bold" />
                        </span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <FAQ
        items={LOYALTY_FAQS}
        title="Loyalty Programme FAQ"
        intro="Everything you need to know about earning and redeeming safari rewards."
      />

      <CTA
        title="Start Earning Rewards Today"
        description="Book your first safari and automatically join our loyalty programme. The journey to Legend status starts with a single trip."
        variant="gradient"
        primaryAction={{
          label: "Browse Safari Tours",
          onClick: () => navigateTo("/tours"),
        }}
        secondaryAction={{
          label: "Contact Us",
          onClick: () => navigateTo("/contact"),
        }}
      />
    </article>
  );
}

export default LoyaltyRewardsPage;
