/**
 * Modern Site Footer - WordPress Template Part
 * 
 * A completely redesigned footer with clean, modern aesthetics.
 * Built with WordPress block theme architecture in mind.
 */

import { 
  Envelope,
  Phone,
  MapPin,
  Clock
} from "@phosphor-icons/react";
import { Container } from "../common/Container";
import { Logo } from "../common/Logo";
import { SocialLinks, type SocialLink } from "../common/SocialLinks";
import { NewsletterSignupPattern } from "../patterns/NewsletterSignupPattern";
import { SITE_CONFIG } from "../../data/site-config";
import { useNavigation } from "../../contexts/NavigationContext";

/**
 * Footer component props.
 */
interface FooterProps {
  /** Current active page ID */
  currentPage?: string;
  /** Callback when navigation link is clicked */
  onNavigate?: (pageId: string) => void;
}

/**
 * Social media links configuration.
 */
const SOCIAL_LINKS: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "instagram", url: "https://instagram.com" },
  { platform: "twitter", url: "https://twitter.com" },
  { platform: "linkedin", url: "https://linkedin.com" },
  { platform: "youtube", url: "https://youtube.com" },
];

/**
 * Footer navigation sections.
 */
const FOOTER_NAV = {
  explore: [
    { label: "Tours", href: "/tours" },
    { label: "Destinations", href: "/destinations" },
    { label: "Accommodation", href: "/accommodation" },
    { label: "Conservation", href: "/sustainability", badge: "Impact" },
    { label: "Specials & Deals", href: "/specials", badge: "New" },
    { label: "Reviews", href: "/reviews" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Why Book With Us", href: "/why-book-with-us" },
  ],
  support: [
    { label: "Booking Terms", href: "/booking-terms" },
    { label: "Travel Insurance", href: "/travel-insurance" },
    { label: "Payment Options", href: "/payment-options" },
    { label: "Cancellation Policy", href: "/cancellation-policy" },
  ],
};

/**
 * Modern Footer Component.
 */
export function Footer({ onNavigate }: FooterProps) {
  const { navigateTo } = useNavigation();

  const handleNavigate = (path: string) => {
    if (onNavigate) onNavigate(path);
    else navigateTo(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="wp-part-footer theme-organic">
      {/* Newsletter Section */}
      <section className="wp-part-footer__newsletter-wrapper">
        <NewsletterSignupPattern
          title="Join Our Adventure"
          description="Get the latest safari tips, destination guides, and exclusive offers delivered to your inbox."
          onSubmit={async (email) => {
            console.log("Newsletter signup:", email);
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }}
          successMessage="You've been added to our mailing list. Stay tuned!"
        />
      </section>

      <Container>
        {/* Main Footer Content */}
        <div className="wp-part-footer__main">
          {/* Column 1: Brand */}
          <div className="wp-part-footer__brand">
            <button
              onClick={() => handleNavigate("/")}
              className="wp-part-footer__logo"
              aria-label={`${SITE_CONFIG.name} - Home`}
            >
              <Logo className="h-10" bare />
            </button>
            
            <p className="wp-part-footer__description">
              {SITE_CONFIG.description}
            </p>

            <div className="wp-part-footer__social">
              <SocialLinks links={SOCIAL_LINKS} size="md" />
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="wp-part-footer__column">
            <h4 className="wp-part-footer__column-title">
              Explore
            </h4>
            <ul className="wp-part-footer__nav-list">
              {FOOTER_NAV.explore.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavigate(link.href)}
                    className="wp-part-footer__nav-link"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="wp-part-footer__nav-badge">
                        {link.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="wp-part-footer__column">
            <h4 className="wp-part-footer__column-title">
              Company
            </h4>
            <ul className="wp-part-footer__nav-list">
              {FOOTER_NAV.company.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavigate(link.href)}
                    className="wp-part-footer__nav-link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="wp-part-footer__column">
            <h4 className="wp-part-footer__column-title">
              Contact
            </h4>
            <ul className="wp-part-footer__contact-list">
              <li className="wp-part-footer__contact-item">
                <MapPin className="wp-part-footer__contact-icon" />
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                  className="wp-part-footer__contact-link"
                >
                  <Phone className="wp-part-footer__contact-icon" />
                  <span>{SITE_CONFIG.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="wp-part-footer__contact-link"
                >
                  <Envelope className="wp-part-footer__contact-icon" />
                  <span>{SITE_CONFIG.contact.email}</span>
                </a>
              </li>
              <li className="wp-part-footer__contact-item">
                <Clock className="wp-part-footer__contact-icon" />
                <span>Mon-Fri: 9am-5pm SAST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="wp-part-footer__bottom">
          <div className="wp-part-footer__copyright">
            <span className="wp-part-footer__copyright-text">&copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.</span>
            <div className="wp-part-footer__dev-tools">
              <span className="wp-part-footer__separator">|</span>
              <button onClick={() => handleNavigate("/dev-tools/template-tester")} className="wp-part-footer__dev-link">Test Templates</button>
              <button onClick={() => handleNavigate("/dev-tools")} className="wp-part-footer__dev-link">Dev Tools</button>
            </div>
          </div>

          <div className="wp-part-footer__legal">
            <button onClick={() => handleNavigate("/privacy-policy")} className="wp-part-footer__legal-link">Privacy Policy</button>
            <button onClick={() => handleNavigate("/terms-conditions")} className="wp-part-footer__legal-link">Terms of Service</button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;