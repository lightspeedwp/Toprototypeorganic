/**
 * Quote Request Form Page - Conversion Optimization Page
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
import { Button } from "../components/blocks/design/Button";
import { 
  Calendar, 
  Users, 
  EnvelopeSimple as Mail, 
  Phone, 
  User, 
  MapPin,
  Clock,
  CheckCircle as CircleCheck,
  Shield,
  Medal as Award,
  Spinner as LoaderCircle,
  TrendUp as TrendingUp,
  Star
} from "@phosphor-icons/react";
import { useNavigation } from "../contexts/NavigationContext";

export function QuoteRequestPage() {
  const { navigateTo } = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSuccess) {
    return (
      <article className="wp-template-page">
        <Hero
          context="quote-request-success"
        />
        <section className="py-section-md">
          <Container maxWidth="narrow">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-success/10 text-success mb-8">
                <CircleCheck size={40} />
              </div>
              <h2 className="mb-6">What's Next?</h2>
              <div className="space-y-8 text-left mb-12">
                <div className="flex gap-4 p-6 rounded-xl bg-card border border-border">
                  <Clock className="text-primary shrink-0" />
                  <div>
                    <h4>Personalized Proposal</h4>
                    <p className="text-muted-foreground text-sm">Within 24 hours, you'll receive a detailed itinerary with accommodation options and pricing.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 rounded-xl bg-card border border-border">
                  <User className="text-primary shrink-0" />
                  <div>
                    <h4>Expert Consultation</h4>
                    <p className="text-muted-foreground text-sm">A dedicated safari specialist will be assigned to your request to help refine every detail.</p>
                  </div>
                </div>
              </div>
              <Button variant="primary" size="lg" onClick={() => navigateTo("/tours")}>Browse All Tours</Button>
            </div>
          </Container>
        </section>
      </article>
    );
  }

  return (
    <PageShell context="quote-request">
      <StatisticsMetricsPattern
        statistics={[
          { value: "24h", label: "Average Response", icon: Clock },
          { value: "250+", label: "Quotes This Month", icon: CircleCheck },
          { value: "4.9", label: "Expert Rating", icon: Star, suffix: "/5" },
        ]}
      />

      <section className="py-section-lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <SectionHeaderPattern
                title="Your Safari Preferences"
                description="Tell us a bit about your travel dreams and we'll handle the rest."
                className="mb-12!"
              />
              
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-6">
                  <h3 className="pb-2 border-b border-border/50">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm">Full Name</label>
                      <input type="text" required placeholder="John Smith" className="w-full h-12 rounded-lg border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Email Address</label>
                      <input type="email" required placeholder="john@example.com" className="w-full h-12 rounded-lg border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="pb-2 border-b border-border/50">Trip Vision</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm">Destination</label>
                      <select required className="w-full h-12 rounded-lg border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option value="">Select destination</option>
                        <option value="kenya">Kenya</option>
                        <option value="tanzania">Tanzania</option>
                        <option value="south-africa">South Africa</option>
                        <option value="botswana">Botswana</option>
                        <option value="multiple">Multiple / Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Travel Style</label>
                      <select required className="w-full h-12 rounded-lg border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option value="">Select style</option>
                        <option value="luxury">Luxury Lodge</option>
                        <option value="adventure">Adventure / Camping</option>
                        <option value="family">Family Friendly</option>
                        <option value="honeymoon">Honeymoon</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Estimated Departure</label>
                      <input type="date" className="w-full h-12 rounded-lg border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Number of Travelers</label>
                      <input type="number" min="1" placeholder="2" className="w-full h-12 rounded-lg border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm">Additional Requests</label>
                  <textarea rows={4} placeholder="Include any special interests, dietary needs, or bucket-list sightings..." className="w-full rounded-lg border border-border bg-background p-4 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-xl"
                >
                  {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Request My Free Quote"}
                </Button>
              </form>
            </div>

            {/* Sidebar Column */}
            <aside className="space-y-10">
              <div className="p-8 rounded-2xl bg-muted/30 border border-border/50">
                <h4 className="mb-6">Why Request a Quote?</h4>
                <ul className="space-y-6 list-none p-0 m-0">
                  <li className="flex gap-3 m-0">
                    <CircleCheck size={20} className="text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-sm mb-0"><strong>No Obligation</strong></p>
                      <p className="text-xs text-muted-foreground">Free to request, zero commitment to book.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 m-0">
                    <CircleCheck size={20} className="text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-sm mb-0"><strong>Best Price Guarantee</strong></p>
                      <p className="text-xs text-muted-foreground">Direct-to-operator rates with no hidden fees.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 m-0">
                    <CircleCheck size={20} className="text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-sm mb-0"><strong>Expert Optimization</strong></p>
                      <p className="text-xs text-muted-foreground">We optimize logistics to maximize your wildlife time.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute -bottom-4 -right-4 opacity-10">
                  <Phone size={120} />
                </div>
                <div className="relative z-10">
                  <h4 className="mb-4">Prefer to Speak?</h4>
                  <p className="text-sm opacity-90 mb-6">Our consultants are available for a one-on-one discovery call.</p>
                  <a href="tel:+27211234567" className="block mb-2 hover:underline">+27 21 123 4567</a>
                  <p className="text-xs opacity-70">Mon-Fri: 8am - 6pm SAST</p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <FAQ
        title="Quote & Planning FAQ"
        intro="Common questions about our tailored safari planning process."
        items={[
          { id: "q1", question: "How much does a custom quote cost?", answer: "Requesting a quote is completely free and carries no obligation to book.", category: "general" },
          { id: "q2", question: "Can I make changes to my quote?", answer: "Of course! Your specialist will work with you to refine the itinerary until it's perfect.", category: "process" }
        ]}
      />

      <CTA
        title="Not Ready for a Quote?"
        description="Browse our pre-designed safari collection for inspiration."
        variant="gradient"
        primaryAction={{ label: "View All Tours", onClick: () => navigateTo("/tours") }}
        secondaryAction={{ label: "Explore Destinations", onClick: () => navigateTo("/destinations") }}
      />
    </PageShell>
  );
}

export default QuoteRequestPage;
