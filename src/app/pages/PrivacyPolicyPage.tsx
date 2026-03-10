/**
 * Privacy Policy Page - WordPress Template
 * Now uses PageShell for centralized breadcrumbs + hero.
 */

import { EditorialContent } from "../components/patterns/EditorialContent";
import { CTA } from "../components/patterns/CTA";
import { TableOfContentsPattern } from "../components/patterns/TableOfContentsPattern";
import { ContactInfoPattern } from "../components/patterns/ContactInfoPattern";
import { PageShell } from "../components/parts/PageShell";
import { useNavigation } from "../contexts/NavigationContext";

export function PrivacyPolicyPage() {
  const { navigateTo } = useNavigation();

  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "collection", label: "Information Collection" },
    { id: "usage", label: "How We Use Data" },
    { id: "security", label: "Data Security" },
    { id: "rights", label: "Your Privacy Rights" },
    { id: "contact", label: "Contact Us" },
  ];

  const content = `
    <div id="intro">
      <h2>Introduction</h2>
      <p>This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website. Your trust is essential to us, and we are committed to being transparent about our data practices.</p>
    </div>

    <div id="collection">
      <h2>Information We Collect</h2>
      <p>We collect information that you provide directly to us when making a booking, subscribing to our newsletter, or contacting our team. This may include:</p>
      <ul>
        <li><strong>Personal Identifiers:</strong> Name, email address, phone number, and physical address.</li>
        <li><strong>Travel Details:</strong> Passport information (for international bookings), emergency contacts, and dietary or medical requirements.</li>
        <li><strong>Payment Data:</strong> Transaction records and billing information (processed through secure payment gateways).</li>
      </ul>
    </div>

    <div id="usage">
      <h2>How We Use Data</h2>
      <p>Your information allows us to provide a seamless safari experience. We use it to:</p>
      <ul>
        <li>Fulfill tour bookings and secure accommodation.</li>
        <li>Send critical travel alerts and updated itineraries.</li>
        <li>Communicate with local partners to ensure your requirements are met.</li>
        <li>Improve our services through customer feedback and site analytics.</li>
      </ul>
    </div>

    <div id="security">
      <h2>Data Security</h2>
      <p>We implement industry-standard administrative, technical, and physical security measures. While we strive to protect your personal information, no method of transmission over the internet is 100% secure.</p>
    </div>

    <div id="rights">
      <h2>Your Privacy Rights</h2>
      <p>Depending on your jurisdiction (such as GDPR or CCPA regions), you may have the right to access, correct, or delete your personal data. Please contact our privacy team to exercise these rights.</p>
    </div>

    <div id="contact">
      <h2>Contacting Us</h2>
      <p>If you have any questions about this policy or our data handling practices, please reach out to our dedicated privacy officer.</p>
    </div>
  `;

  return (
    <PageShell context="privacy-policy">
      <TableOfContentsPattern
        title="Policy Sections"
        sections={sections}
        variant="default"
      />

      <EditorialContent
        variant="narrow"
        content={content}
        animated
      />

      <ContactInfoPattern
        title="Privacy Officer"
        description="Direct line for data protection inquiries."
        items={[
          { type: 'email', label: 'Privacy Support', value: 'privacy@touroperator.com', href: 'mailto:privacy@touroperator.com' },
          { type: 'phone', label: 'Direct Line', value: '+27 21 123 4567', href: 'tel:+27211234567' }
        ]}
        columns={2}
        variant="card"
        className="bg-muted/30 py-section-md border-y border-border/50"
      />

      <CTA
        title="Have Concerns?"
        description="We are here to help you understand our policies and how your data is handled."
        variant="gradient"
        primaryAction={{
          label: "Contact Support",
          onClick: () => navigateTo("/contact"),
        }}
        secondaryAction={{
          label: "Terms of Service",
          onClick: () => navigateTo("/terms-conditions"),
        }}
      />
    </PageShell>
  );
}

export default PrivacyPolicyPage;
