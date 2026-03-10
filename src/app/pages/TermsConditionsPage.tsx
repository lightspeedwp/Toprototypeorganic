/**
 * Terms & Conditions Page - WordPress Template
 * Now uses PageShell for centralized breadcrumbs + hero.
 */

import { EditorialContent } from "../components/patterns/EditorialContent";
import { CTA } from "../components/patterns/CTA";
import { TableOfContentsPattern } from "../components/patterns/TableOfContentsPattern";
import { ContactInfoPattern } from "../components/patterns/ContactInfoPattern";
import { PageShell } from "../components/parts/PageShell";
import { useNavigation } from "../contexts/NavigationContext";

export function TermsConditionsPage() {
  const { navigateTo } = useNavigation();

  const sections = [
    { id: "general", label: "General Terms" },
    { id: "booking", label: "Booking Process" },
    { id: "payment", label: "Payment & Fees" },
    { id: "cancellation", label: "Cancellation Policy" },
    { id: "insurance", label: "Travel Insurance" },
    { id: "liability", label: "Liability & Responsibility" },
  ];

  const content = `
    <div id="general">
      <h2>General Terms</h2>
      <p>By using our services and booking a tour, you agree to these Terms & Conditions. These terms constitute a legally binding agreement between you and our company. We act as a tour organizer and agent for various service providers.</p>
    </div>

    <div id="booking">
      <h2>Booking Process</h2>
      <p>A booking is considered tentative until we receive your deposit. Once payment is verified, we will issue a formal confirmation. It is your responsibility to verify all details on the confirmation, including travel dates and name spellings.</p>
      <h3>Health & Fitness</h3>
      <p>Many of our tours involve physical activity. You must disclose any medical conditions or physical limitations that may affect your ability to participate before booking.</p>
    </div>

    <div id="payment">
      <h2>Payment & Fees</h2>
      <p>To secure your safari, a 30% non-refundable deposit is required. The remaining balance must be paid in full at least 60 days before the tour departure date.</p>
      <ul>
        <li><strong>Currency:</strong> All prices are in USD unless otherwise stated.</li>
        <li><strong>Late Payment:</strong> Failure to pay the balance on time may result in booking cancellation and loss of deposit.</li>
      </ul>
    </div>

    <div id="cancellation">
      <h2>Cancellation Policy</h2>
      <p>All cancellations must be submitted in writing via email. The following fees apply based on when notice is received:</p>
      <ul>
        <li><strong>60+ days before departure:</strong> Loss of deposit only.</li>
        <li><strong>30-59 days before departure:</strong> 50% of total tour cost.</li>
        <li><strong>Under 30 days before departure:</strong> 100% of total tour cost.</li>
      </ul>
    </div>

    <div id="insurance">
      <h2>Travel Insurance</h2>
      <p>Comprehensive travel insurance is mandatory for all our tours. Your policy must cover emergency medical expenses, evacuation, trip cancellation, and personal liability. We reserve the right to request proof of insurance before departure.</p>
    </div>

    <div id="liability">
      <h2>Liability & Responsibility</h2>
      <p>While we exercise all reasonable care in choosing our suppliers (lodges, transport, guides), we do not own or operate these independent entities. We cannot be held liable for their negligence, strikes, weather conditions, or unforeseen events.</p>
    </div>
  `;

  return (
    <PageShell context="terms-conditions">
      <TableOfContentsPattern
        title="Agreement Details"
        sections={sections}
        variant="default"
      />

      <EditorialContent
        variant="narrow"
        content={content}
        animated
      />

      <ContactInfoPattern
        title="Legal Inquiries"
        description="For clarification on any of our terms or conditions."
        items={[
          { type: 'email', label: 'Legal Team', value: 'legal@touroperator.com', href: 'mailto:legal@touroperator.com' },
          { type: 'address', label: 'Registered Office', value: '123 Main Road, Cape Town, 8001, SA' }
        ]}
        columns={2}
        variant="card"
        className="bg-muted/30 py-section-md border-y border-border/50"
      />

      <CTA
        title="Ready to Agree?"
        description="If you understand and accept our terms, you're one step closer to your dream safari."
        variant="gradient"
        primaryAction={{
          label: "Start Booking",
          onClick: () => navigateTo("/tours"),
        }}
        secondaryAction={{
          label: "Privacy Policy",
          onClick: () => navigateTo("/privacy-policy"),
        }}
      />
    </PageShell>
  );
}

export default TermsConditionsPage;
