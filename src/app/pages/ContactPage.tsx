/**
 * Contact Page Component.
 * 
 * Now using PageShell for centralized breadcrumbs + hero.
 * Passes custom hero CTA props via heroProps override.
 */

import { FAQ } from "../components/patterns/FAQ";
import { CTA } from "../components/patterns/CTA";
import { ContactFormPattern } from "../components/patterns/ContactFormPattern";
import { ContactInfoPattern } from "../components/patterns/ContactInfoPattern";
import { MapSectionPattern } from "../components/patterns/MapSectionPattern";
import { PageShell } from "../components/parts/PageShell";
import { Container } from "../components/common/Container";
import { getPageSectionFAQs } from "../data/mock";
import { Clock, Buildings as Building2, ShieldCheck, Headphones } from "@phosphor-icons/react";
import { useNavigation } from "../contexts/NavigationContext";

export function ContactPage() {
  const faqData = getPageSectionFAQs("contact");
  const { navigateTo } = useNavigation();

  return (
    <PageShell
      context="contact"
      className="theme-organic"
      heroProps={{
        primaryCTA: {
          label: "Send an Inquiry",
          onClick: () => {
            const el = document.getElementById('contact-form');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        },
        secondaryCTA: {
          label: "Trip Planner",
          onClick: () => navigateTo("/trip-planner"),
          variant: "outline"
        }
      }}
    >
      <div className="organic-section-top">
        {/* Trust & Support Highlights */}
        <section className="wp-template-page__stats border-b border-border/50">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-gap-lg)]">
              <div className="flex gap-[var(--spacing-gap-md)] p-[var(--spacing-element-lg)] rounded-[var(--radius-md)] bg-muted/30 border border-border/50">
                <div className="p-[var(--spacing-element-sm)] rounded-[var(--radius-sm)] bg-primary/10 text-primary shrink-0 self-start">
                  <Clock className="size-6" />
                </div>
                <div>
                  <h3 className="m-0 mb-[var(--spacing-element-xs)]">Fast Response</h3>
                  <p className="text-fluid-sm text-muted-foreground m-0">We typically respond to all inquiries within 2-4 business hours.</p>
                </div>
              </div>
              <div className="flex gap-[var(--spacing-gap-md)] p-[var(--spacing-element-lg)] rounded-[var(--radius-md)] bg-muted/30 border border-border/50">
                <div className="p-[var(--spacing-element-sm)] rounded-[var(--radius-sm)] bg-primary/10 text-primary shrink-0 self-start">
                  <ShieldCheck className="size-6" />
                </div>
                <div>
                  <h3 className="m-0 mb-[var(--spacing-element-xs)]">Expert Advice</h3>
                  <p className="text-fluid-sm text-muted-foreground m-0">Speak directly with guides who have personal experience in the field.</p>
                </div>
              </div>
              <div className="flex gap-[var(--spacing-gap-md)] p-[var(--spacing-element-lg)] rounded-[var(--radius-md)] bg-muted/30 border border-border/50">
                <div className="p-[var(--spacing-element-sm)] rounded-[var(--radius-sm)] bg-primary/10 text-primary shrink-0 self-start">
                  <Headphones className="size-6" />
                </div>
                <div>
                  <h3 className="m-0 mb-[var(--spacing-element-xs)]">24/7 Support</h3>
                  <p className="text-fluid-sm text-muted-foreground m-0">Our travelers have access to emergency support throughout their journey.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>

      <div className="organic-section-middle">
        {/* Primary Contact Area */}
        <section className="wp-template-page__form bg-card">
          <Container>
            <div className="grid lg:grid-cols-2 gap-[var(--spacing-gap-xl)] items-start">
              <div className="space-y-[var(--spacing-element-xl)]">
                <ContactInfoPattern
                  title="Get in Touch"
                  description="Use the contact details below to reach our offices directly."
                  items={[
                    { type: 'phone', label: 'Main Office', value: '+27 21 123 4567', href: 'tel:+27211234567' },
                    { type: 'email', label: 'General Enquiries', value: 'hello@touroperator.com', href: 'mailto:hello@touroperator.com' },
                    { type: 'address', label: 'Cape Town HQ', value: ['123 Main Road', 'Cape Town, 8001', 'South Africa'] }
                  ]}
                  columns={1}
                  variant="card"
                  className="p-0!"
                />
                
                <div className="p-[var(--spacing-element-xl)] rounded-[var(--radius-lg)] bg-primary/5 border-2 border-primary/10">
                  <div className="flex items-center gap-[var(--spacing-element-sm)] mb-[var(--spacing-element-md)]">
                    <Building2 className="size-5 text-primary" />
                    <h4 className="m-0 wp-text--hand">Business Hours</h4>
                  </div>
                  <div className="space-y-[var(--spacing-element-xs)]">
                    <div className="flex justify-between text-fluid-sm">
                      <span className="text-foreground">Monday - Friday</span>
                      <span className="text-muted-foreground">08:00 - 18:00 (SAST)</span>
                    </div>
                    <div className="flex justify-between text-fluid-sm">
                      <span className="text-foreground">Saturday</span>
                      <span className="text-muted-foreground">09:00 - 13:00 (SAST)</span>
                    </div>
                    <div className="flex justify-between text-fluid-sm">
                      <span className="text-foreground">Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-[var(--spacing-section-sm)] md:p-[var(--spacing-section-md)] rounded-[var(--radius-lg)] bg-background border-2 border-border shadow-xl" id="contact-form">
                <ContactFormPattern
                  title="Send a Message"
                  description="Fill out the form below and one of our specialists will reach out to start your planning."
                  variant="compact"
                />
              </div>
            </div>
          </Container>
        </section>
      </div>

      <div className="organic-section-middle-alt">
        {/* Map Section */}
        <div className="wp-template-page__map bg-muted/30 border-y border-border/50">
          <MapSectionPattern
            title="Find Our Office"
            description="We are located in the heart of Cape Town, perfectly positioned to coordinate adventures across the continent."
            location={{
              name: "Cape Town Head Office",
              address: "123 Main Road, Cape Town, 8001, South Africa",
              lat: -33.9249,
              lng: 18.4241
            }}
            variant="split"
          />
        </div>
      </div>

      <div className="organic-section-bottom">
        {/* FAQ */}
        <FAQ
          items={faqData?.items || []}
          title={faqData?.sectionTitle || "Common Questions"}
          intro={faqData?.sectionDescription || "Quick answers to help you get started with your safari planning."}
        />

        {/* CTA */}
        <CTA
          title="Ready to Design Your Safari?"
          description="Try our interactive trip planner tool to receive a personalized itinerary in minutes."
          variant="default"
          primaryAction={{ 
            label: "Start Trip Planner", 
            onClick: () => navigateTo("/trip-planner") 
          }}
          secondaryAction={{ 
            label: "Browse Tours", 
            onClick: () => navigateTo("/tours") 
          }}
        />
      </div>
    </PageShell>
  );
}

export default ContactPage;