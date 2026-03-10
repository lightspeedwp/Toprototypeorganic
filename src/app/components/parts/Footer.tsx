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
    <footer className="wp-part-footer">
      {/* Newsletter Section */}
      <section className="bg-primary/5 py-section-sm border-t border-border/50">
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
        <div className="wp-part-footer__main py-section-md border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-fluid-lg">
            {/* Column 1: Brand */}
            <div className="wp-part-footer__brand flex flex-col gap-6">
              <button
                onClick={() => handleNavigate("/")}
                className="wp-part-footer__logo inline-flex"
                aria-label={`${SITE_CONFIG.name} - Home`}
              >
                <Logo className="h-10" bare />
              </button>
              
              <p className="wp-part-footer__description text-muted-foreground leading-relaxed">
                {SITE_CONFIG.description}
              </p>

              <SocialLinks links={SOCIAL_LINKS} size="md" />
            </div>

            {/* Column 2: Explore */}
            <div className="wp-part-footer__column flex flex-col gap-6">
              <h4 className="wp-part-footer__column-title font-serif font-semibold text-fluid-lg">
                Explore
              </h4>
              <ul className="wp-part-footer__nav-list flex flex-col gap-3 list-none p-0 m-0">
                {FOOTER_NAV.explore.map((link) => (
                  <li key={link.href} className="m-0">
                    <button
                      onClick={() => handleNavigate(link.href)}
                      className="wp-part-footer__nav-link text-muted-foreground hover:text-primary transition-colors text-left flex items-center gap-2"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 rounded-sm bg-accent/10 text-accent text-fluid-xs font-bold uppercase tracking-wider">
                          {link.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="wp-part-footer__column flex flex-col gap-6">
              <h4 className="wp-part-footer__column-title font-serif font-semibold text-fluid-lg">
                Company
              </h4>
              <ul className="wp-part-footer__nav-list flex flex-col gap-3 list-none p-0 m-0">
                {FOOTER_NAV.company.map((link) => (
                  <li key={link.href} className="m-0">
                    <button
                      onClick={() => handleNavigate(link.href)}
                      className="wp-part-footer__nav-link text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="wp-part-footer__column flex flex-col gap-6">
              <h4 className="wp-part-footer__column-title font-serif font-semibold text-fluid-lg">
                Contact
              </h4>
              <ul className="wp-part-footer__contact-list flex flex-col gap-4 list-none p-0 m-0">
                <li className="flex items-start gap-3 text-muted-foreground text-fluid-sm">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.contact.address}</span>
                </li>
                <li className="m-0">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-fluid-sm"
                  >
                    <Phone size={18} className="text-primary" />
                    <span>{SITE_CONFIG.contact.phone}</span>
                  </a>
                </li>
                <li className="m-0">
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-fluid-sm"
                  >
                    <Envelope size={18} className="text-primary" />
                    <span>{SITE_CONFIG.contact.email}</span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground text-fluid-sm">
                  <Clock size={18} className="text-primary" />
                  <span>Mon-Fri: 9am-5pm SAST</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="wp-part-footer__bottom py-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6 text-fluid-xs text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span>&copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <button onClick={() => handleNavigate("/dev-tools/template-tester")} className="hover:text-primary transition-colors underline decoration-dotted">Test Templates</button>
              <button onClick={() => handleNavigate("/dev-tools")} className="hover:text-primary transition-colors underline decoration-dotted">Dev Tools</button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => handleNavigate("/privacy-policy")} className="hover:text-primary transition-colors">Privacy Policy</button>
            <button onClick={() => handleNavigate("/terms-conditions")} className="hover:text-primary transition-colors">Terms of Service</button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;