/**
 * Newsletter Signup Page - Conversion Optimization Page
 * Now uses PageShell for centralized breadcrumbs + hero.
 */

import { useState } from "react";
import { Hero } from "../components/patterns/Hero";
import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { PageShell } from "../components/parts/PageShell";
import { StatisticsMetricsPattern } from "../components/patterns/StatisticsMetricsPattern";
import { SectionHeaderPattern } from "../components/patterns/SectionHeaderPattern";
import { HighlightsGridPattern } from "../components/patterns/HighlightsGridPattern";
import { Button } from "../components/blocks/design/Button";
import { 
  EnvelopeSimple as Mail, 
  CheckCircle as CircleCheck,
  Users,
  Globe,
  Lightning as Zap,
  Sparkle as Sparkles,
  Gift,
  Calendar,
  Spinner as LoaderCircle,
  Shield,
} from "@phosphor-icons/react";
import { useNavigation } from "../contexts/NavigationContext";

const BENEFITS = [
  {
    id: "exclusive-deals",
    icon: Gift,
    title: "Exclusive Deals",
    description: "Subscriber-only discounts on safari packages and last-minute specials."
  },
  {
    id: "insider-tips",
    icon: Zap,
    title: "Insider Tips",
    description: "Expert advice on wildlife viewing, photography, and local culture."
  },
  {
    id: "destination-guides",
    icon: Globe,
    title: "Free Guides",
    description: "Downloadable PDF destination guides for our most popular regions."
  },
  {
    id: "early-access",
    icon: Sparkles,
    title: "Early Access",
    description: "Be the first to know about new safari packages and seasonal departures."
  }
];

const RECENT_NEWSLETTERS = [
  {
    id: "nov-2024",
    title: "Great Migration Season Guide",
    date: "Nov 2024",
    topics: ["Serengeti", "Photography"],
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600"
  },
  {
    id: "oct-2024",
    title: "Gorilla Trekking Masterclass",
    date: "Oct 2024",
    topics: ["Rwanda", "Uganda"],
    image: "https://images.unsplash.com/photo-1551526805-b43a85b4e0b5?w=600"
  },
  {
    id: "sep-2024",
    title: "South Africa's Hidden Gems",
    date: "Sep 2024",
    topics: ["Kruger", "Cape Town"],
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600"
  }
];

export function NewsletterSignupPage() {
  const { navigateTo } = useNavigation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <article className="wp-template-page">
        <Hero
          context="newsletter"
          title="Welcome to the Community!"
          intro="You're now subscribed to our safari newsletter. A world of adventure awaits in your inbox."
        />
        <section className="py-section-md">
          <Container maxWidth="narrow">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-success/10 text-success mb-8">
                <CircleCheck size={40} />
              </div>
              <h2 className="mb-6">Check Your Inbox</h2>
              <p className="text-muted-foreground mb-12">We've sent you a confirmation email with your free welcome gift: our 48-page African Safari Planning Guide.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" onClick={() => navigateTo("/tours")}>Browse All Tours</Button>
                <Button variant="outline" size="lg" onClick={() => navigateTo("/")}>Return Home</Button>
              </div>
            </div>
          </Container>
        </section>
      </article>
    );
  }

  return (
    <PageShell context="newsletter">
      <StatisticsMetricsPattern
        statistics={[
          { value: "12k+", label: "Happy Subscribers", icon: Users },
          { value: "2x", label: "Monthly Issues", icon: Calendar },
          { value: "15%", label: "Average Savings", icon: Gift },
        ]}
      />

      <HighlightsGridPattern
        title="Why Subscribe?"
        description="We only send valuable content that helps you plan the perfect African adventure."
        highlights={BENEFITS}
        columns={4}
      />

      {/* Preview Section */}
      <section className="py-section-md bg-muted/20 border-y border-border/50">
        <Container>
          <SectionHeaderPattern
            title="Recent Newsletter Examples"
            description="Take a look at the kind of stories and deals our community enjoys."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RECENT_NEWSLETTERS.map((item) => (
              <div key={item.id} className="group rounded-xl overflow-hidden bg-card border border-border/50 shadow-sm transition-hover hover:shadow-lg">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase tracking-widest text-primary/60">{item.date}</span>
                  <h4 className="mt-2 mb-4">{item.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.topics.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-muted text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="py-section-lg">
        <Container maxWidth="narrow">
          <div className="p-10 md:p-16 rounded-3xl bg-card border border-border shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Mail size={120} />
            </div>
            
            <div className="relative z-10">
              <h2 className="mb-4">Start Your Subscription</h2>
              <p className="text-muted-foreground mb-8">Join thousands of travelers who get the best of Africa in their inbox. Free to join, easy to leave.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 rounded-xl border border-border bg-background px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-xl"
                >
                  {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Subscribe for Free"}
                </Button>
                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <Shield size={12} />
                  <span>We value your privacy. No spam, ever. Unsubscribe with one click.</span>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQ
        title="Newsletter FAQ"
        intro="Common questions about our community and communication."
        items={[
          { id: "f1", question: "How often will I hear from you?", answer: "We send our main newsletter twice a month. Occasionally, we'll send a special update if there's a major deal or new destination launching.", category: "general" },
          { id: "f2", question: "Is my data safe?", answer: "Absolutely. We use industry-standard encryption and never share your details with third parties. Your trust is our priority.", category: "privacy" }
        ]}
      />

      <CTA
        title="Not Ready to Join Yet?"
        description="Browse our latest safari collection or talk to a specialist about your travel dreams."
        variant="gradient"
        primaryAction={{ label: "Explore Tours", onClick: () => navigateTo("/tours") }}
        secondaryAction={{ label: "View Destinations", onClick: () => navigateTo("/destinations") }}
      />
    </PageShell>
  );
}

export default NewsletterSignupPage;
