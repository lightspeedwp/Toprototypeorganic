/**
 * Sitemap Page — comprehensive visual index of all routes in the prototype.
 *
 * Data-driven: imports actual mock data from all content modules so every
 * tour, destination, accommodation, blog post, review, team member, and
 * special is listed with its real route.
 *
 * @module SitemapPage
 * @category pages
 */

import { AppLink as Link } from "../components/common/AppLink";
import { Container } from "../components/common/Container";
import { PageShell } from "../components/parts/PageShell";
import { ParagraphBlock } from "../components/blocks/core/ParagraphBlock";
import {
  Compass,
  MapPin,
  Hotel,
  Users,
  BookOpen,
  FileText,
  ChevronRight,
  Sparkles,
  Globe,
  Star,
  Tag,
  Search,
  ShieldCheck,
  Heart,
  CreditCard,
  LogIn,
  Bookmark,
  Code,
  Layers,
  Award,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data imports                                                       */
/* ------------------------------------------------------------------ */
import { ALL_TOURS } from "../data/tours";
import { DESTINATIONS, COUNTRIES, CONTINENTS } from "../data/destinations";
import {
  ASIA_DESTINATIONS,
  EUROPE_DESTINATIONS,
} from "../data/destinations";
import { ALL_ACCOMMODATION } from "../data/accommodation";
import { ALL_BLOG_POSTS, BLOG_CATEGORIES } from "../data/blog";
import { ALL_REVIEWS } from "../data/reviews";
import { ALL_TEAM_MEMBERS } from "../data/team";
import { SPECIALS_DATA } from "../data/specials/data";
import { TRAVEL_STYLES } from "../data/taxonomies/travel-styles";
import { ACCOMMODATION_TYPES } from "../data/taxonomies/accommodation-types";
import { BRANDS } from "../data/taxonomies/brands";
import { BLOG_TAGS } from "../data/blog/tags";
import { TRAVELLER_TYPES } from "../data/taxonomies/traveller-types";
import { FACILITIES } from "../data/taxonomies/facilities";
import {
  EAST_AFRICA,
  SOUTHERN_AFRICA,
  INDIAN_OCEAN_DESTINATIONS,
} from "../data/destinations";
import { ALL_FAQS, FAQ_CATEGORIES } from "../data/faqs";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SitemapLink {
  label: string;
  href: string;
  children?: SitemapLink[];
}

interface SitemapSection {
  title: string;
  icon: React.ElementType;
  description?: string;
  links: SitemapLink[];
}

/* ------------------------------------------------------------------ */
/*  Build sections from real data                                      */
/* ------------------------------------------------------------------ */

const SITEMAP_SECTIONS: SitemapSection[] = [
  /* ── Tours ── */
  {
    title: "Tours",
    icon: Compass,
    description: `${ALL_TOURS.length} safari & adventure packages`,
    links: [
      {
        label: "All Tours",
        href: "/tours",
        children: ALL_TOURS.map((t) => ({
          label: t.title,
          href: `/tours/${t.slug}`,
        })),
      },
      {
        label: "Tours by Travel Style",
        href: "/travel-styles",
        children: TRAVEL_STYLES.map((ts) => ({
          label: ts.name,
          href: `/tours/travel-style/${ts.slug}`,
        })),
      },
    ],
  },

  /* ── Destinations ── */
  {
    title: "Destinations",
    icon: MapPin,
    description: `${COUNTRIES.length} countries, ${DESTINATIONS.length} total destinations across ${CONTINENTS.length} continents`,
    links: [
      {
        label: `East Africa (${EAST_AFRICA.filter(d => d.type === "country").length} countries)`,
        href: "/destinations",
        children: EAST_AFRICA.filter(d => d.type === "country").map((c) => ({
          label: c.title,
          href: `/destinations/${c.slug}`,
          children: EAST_AFRICA.filter(d => d.parentId === c.id).map((r) => ({
            label: r.title,
            href: `/destinations/${r.slug}`,
          })),
        })),
      },
      {
        label: `Southern Africa (${SOUTHERN_AFRICA.filter(d => d.type === "country").length} countries)`,
        href: "/destinations",
        children: SOUTHERN_AFRICA.filter(d => d.type === "country").map((c) => ({
          label: c.title,
          href: `/destinations/${c.slug}`,
          children: SOUTHERN_AFRICA.filter(d => d.parentId === c.id).map((r) => ({
            label: r.title,
            href: `/destinations/${r.slug}`,
          })),
        })),
      },
      {
        label: `Indian Ocean Islands (${INDIAN_OCEAN_DESTINATIONS.filter(d => d.type === "country").length} countries)`,
        href: "/destinations",
        children: INDIAN_OCEAN_DESTINATIONS.filter(d => d.type === "country").map((c) => ({
          label: c.title,
          href: `/destinations/${c.slug}`,
          children: INDIAN_OCEAN_DESTINATIONS.filter(d => d.parentId === c.id).map((r) => ({
            label: r.title,
            href: `/destinations/${r.slug}`,
          })),
        })),
      },
      {
        label: `Asia (${ASIA_DESTINATIONS.filter(d => d.type === "country").length} countries)`,
        href: "/destinations",
        children: ASIA_DESTINATIONS.filter(d => d.type === "country").map((c) => ({
          label: c.title,
          href: `/destinations/${c.slug}`,
          children: ASIA_DESTINATIONS.filter(d => d.parentId === c.id).map((r) => ({
            label: r.title,
            href: `/destinations/${r.slug}`,
          })),
        })),
      },
      {
        label: `Europe (${EUROPE_DESTINATIONS.filter(d => d.type === "country").length} countries)`,
        href: "/destinations",
        children: EUROPE_DESTINATIONS.filter(d => d.type === "country").map((c) => ({
          label: c.title,
          href: `/destinations/${c.slug}`,
          children: EUROPE_DESTINATIONS.filter(d => d.parentId === c.id).map((r) => ({
            label: r.title,
            href: `/destinations/${r.slug}`,
          })),
        })),
      },
      {
        label: "All Destinations",
        href: "/destinations",
      },
    ],
  },

  /* ── Accommodation ── */
  {
    title: "Accommodation",
    icon: Hotel,
    description: `${ALL_ACCOMMODATION.length} lodges & properties`,
    links: [
      {
        label: "All Accommodation",
        href: "/accommodation",
        children: ALL_ACCOMMODATION.map((a) => ({
          label: a.title,
          href: `/accommodation/${a.slug}`,
        })),
      },
    ],
  },

  /* ── Blog ── */
  {
    title: "Blog",
    icon: BookOpen,
    description: `${ALL_BLOG_POSTS.length} articles across ${BLOG_CATEGORIES.length} categories`,
    links: [
      {
        label: "All Blog Posts",
        href: "/blog",
        children: ALL_BLOG_POSTS.map((p) => ({
          label: p.title,
          href: `/blog/${p.slug}`,
        })),
      },
    ],
  },

  /* ── Reviews ── */
  {
    title: "Reviews",
    icon: Star,
    description: `${ALL_REVIEWS.length} traveller reviews`,
    links: [
      {
        label: "All Reviews",
        href: "/reviews",
      },
      {
        label: "Reviews Hub",
        href: "/reviews/hub",
      },
      ...ALL_REVIEWS.map((r) => ({
        label: r.title,
        href: `/reviews/${r.slug}`,
      })),
    ],
  },

  /* ── Team ── */
  {
    title: "Team",
    icon: Users,
    description: `${ALL_TEAM_MEMBERS.length} team members`,
    links: [
      {
        label: "Meet the Team",
        href: "/team",
        children: ALL_TEAM_MEMBERS.map((m) => ({
          label: m.name,
          href: `/team/${m.slug}`,
        })),
      },
    ],
  },

  /* ── Specials ── */
  {
    title: "Special Offers",
    icon: Tag,
    description: `${SPECIALS_DATA.length} current specials`,
    links: [
      {
        label: "All Specials",
        href: "/specials",
        children: SPECIALS_DATA.map((s) => ({
          label: s.title,
          href: `/specials/${s.slug}`,
        })),
      },
    ],
  },

  /* ── Taxonomies ── */
  {
    title: "Taxonomies",
    icon: Globe,
    description: "Browse by category",
    links: [
      {
        label: "Travel Styles Hub",
        href: "/travel-styles",
        children: TRAVEL_STYLES.map((ts) => ({
          label: ts.name,
          href: `/travel-styles/${ts.slug}`,
        })),
      },
      {
        label: "Traveller Types Hub",
        href: "/traveller-types",
        children: TRAVELLER_TYPES.map((tt) => ({
          label: tt.name,
          href: `/traveller-types/${tt.slug}`,
        })),
      },
      {
        label: "Continents",
        href: "/continents/africa",
        children: CONTINENTS.map((c) => ({
          label: c.name,
          href: `/continents/${c.slug}`,
        })),
      },
      {
        label: "Accommodation Types Hub",
        href: "/accommodation-types",
        children: ACCOMMODATION_TYPES.map((at) => ({
          label: at.name,
          href: `/accommodation-types/${at.slug}`,
        })),
      },
      {
        label: "Brands Hub",
        href: "/brands",
        children: BRANDS.map((b) => ({
          label: b.name,
          href: `/brands/${b.slug}`,
        })),
      },
      {
        label: "Blog Categories",
        href: "/categories/news",
        children: BLOG_CATEGORIES.map((c) => ({
          label: c.name,
          href: `/categories/${c.slug}`,
        })),
      },
      {
        label: "Blog Tags",
        href: "/tags/wildlife",
        children: BLOG_TAGS.map((t) => ({
          label: t.name,
          href: `/tags/${t.slug}`,
        })),
      },
      {
        label: `East Africa (${EAST_AFRICA.length} destinations)`,
        href: "/destinations",
        children: EAST_AFRICA.filter((d) => d.type === "country").map((d) => ({
          label: d.title,
          href: `/destinations/${d.slug}`,
        })),
      },
      {
        label: `Southern Africa (${SOUTHERN_AFRICA.length} destinations)`,
        href: "/destinations",
        children: SOUTHERN_AFRICA.filter((d) => d.type === "country").map((d) => ({
          label: d.title,
          href: `/destinations/${d.slug}`,
        })),
      },
      {
        label: `Indian Ocean Islands (${INDIAN_OCEAN_DESTINATIONS.length} destinations)`,
        href: "/destinations",
        children: INDIAN_OCEAN_DESTINATIONS
          .filter((d) => d.type === "country")
          .map((d) => ({
            label: d.title,
            href: `/destinations/${d.slug}`,
          })),
      },
      {
        label: "Facilities Hub",
        href: "/facilities",
        children: FACILITIES.map((f) => ({
          label: f.name,
          href: `/facilities/${f.slug}`,
        })),
      },
    ],
  },

  /* ── Company & Information ── */
  {
    title: "Company",
    icon: ShieldCheck,
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Why Book With Us", href: "/why-book-with-us" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "FAQs Archive", href: "/faqs" },
    ],
  },

  /* ── Conversion & Resources ── */
  {
    title: "Resources & Guides",
    icon: Bookmark,
    links: [
      { label: "Quote Request", href: "/quote-request" },
      { label: "Itinerary Builder", href: "/itinerary-builder" },
      { label: "Destination Guides Hub", href: "/destination-guides" },
      { label: "Travel Insurance", href: "/travel-insurance" },
      { label: "Packing Guides", href: "/packing-guides" },
      { label: "Newsletter Signup", href: "/newsletter" },
      { label: "Loyalty & Rewards", href: "/loyalty-rewards" },
    ],
  },

  /* ── Booking & Account ── */
  {
    title: "Booking & Account",
    icon: CreditCard,
    links: [
      { label: "Booking Management", href: "/booking-management" },
      { label: "Payment", href: "/payment" },
      {
        label: "Booking Confirmation",
        href: "/booking-confirmation",
        children: [
          { label: "Standard", href: "/booking-confirmation" },
          { label: "Enhanced", href: "/booking-confirmation-enhanced" },
        ],
      },
      { label: "Profile", href: "/profile" },
      { label: "Account Settings", href: "/account-settings" },
      { label: "Saved Passengers", href: "/saved-passengers" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Tour Comparison", href: "/tour-comparison" },
      { label: "Trip Planner", href: "/trip-planner" },
    ],
  },

  /* ── Auth ── */
  {
    title: "Authentication",
    icon: LogIn,
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
    ],
  },

  /* ── Search ── */
  {
    title: "Search",
    icon: Search,
    links: [
      { label: "Search Results", href: "/search" },
      { label: "Advanced Search", href: "/advanced-search" },
    ],
  },

  /* ── Legal ── */
  {
    title: "Legal",
    icon: FileText,
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },

  /* ── Organic Demo ── */
  {
    title: "Organic Design System",
    icon: Heart,
    links: [
      { label: "Organic Demo", href: "/organic-demo" },
      { label: "Organic Landing Page", href: "/organic-demo/landing-page" },
      { label: "Day & Dusk Page", href: "/organic-demo/day-and-dusk-page" },
    ],
  },

  /* ── Developer Tools ── */
  {
    title: "Developer Tools",
    icon: Code,
    links: [
      { label: "Dev Tools Dashboard", href: "/dev-tools" },
      {
        label: "Design System",
        href: "/dev-tools/design-system-showcase",
        children: [
          { label: "Design System Showcase", href: "/dev-tools/design-system-showcase" },
          { label: "Design System Example", href: "/dev-tools/design-system-example" },
          { label: "Design System Verification", href: "/dev-tools/design-system-verification" },
          { label: "Design System Playground", href: "/dev-tools/design-system-playground" },
          { label: "Design Tokens Reference", href: "/dev-tools/design-tokens-reference" },
          { label: "Style Guide", href: "/dev-tools/style-guide" },
        ],
      },
      {
        label: "Components",
        href: "/dev-tools/component-showcase",
        children: [
          { label: "Component Showcase", href: "/dev-tools/component-showcase" },
          { label: "Component Library", href: "/dev-tools/component-library" },
          { label: "Component API Reference", href: "/dev-tools/component-api-reference" },
          { label: "Block Documentation", href: "/dev-tools/block-documentation" },
        ],
      },
      {
        label: "Specimens",
        href: "/dev-tools/typography-specimens",
        children: [
          { label: "Typography Specimens", href: "/dev-tools/typography-specimens" },
          { label: "Spacing Scale", href: "/dev-tools/spacing-scale" },
          { label: "Shadow Scale", href: "/dev-tools/shadow-scale" },
          { label: "Radius Specimens", href: "/dev-tools/radius-specimens" },
          { label: "Card Interactions", href: "/dev-tools/card-interactions" },
          { label: "Animations Showcase", href: "/dev-tools/animations-showcase" },
        ],
      },
      {
        label: "Showcases",
        href: "/dev-tools/button-showcase",
        children: [
          { label: "Button Showcase", href: "/dev-tools/button-showcase" },
          { label: "Design Blocks", href: "/dev-tools/design-blocks-showcase" },
          { label: "Theme Blocks", href: "/dev-tools/theme-blocks-showcase" },
          { label: "Section Styles", href: "/dev-tools/section-styles-showcase" },
          { label: "Icon Library", href: "/dev-tools/icon-library" },
          { label: "Notification Examples", href: "/dev-tools/notification-examples" },
          { label: "Header/Footer Comparison", href: "/dev-tools/header-footer-comparison" },
        ],
      },
      {
        label: "Testing & QA",
        href: "/dev-tools/template-tester",
        children: [
          { label: "Template Tester", href: "/dev-tools/template-tester" },
          { label: "Live Preview", href: "/dev-tools/live-preview" },
          { label: "Accessibility Audit", href: "/dev-tools/accessibility-audit" },
          { label: "Visual Regression Tester", href: "/dev-tools/visual-regression-tester" },
          { label: "Integration Tester", href: "/dev-tools/integration-tester" },
          { label: "Code Quality Dashboard", href: "/dev-tools/code-quality-dashboard" },
          { label: "Deployment Readiness", href: "/dev-tools/deployment-readiness" },
        ],
      },
      {
        label: "Monitoring",
        href: "/dev-tools/performance-monitor",
        children: [
          { label: "Performance Monitor", href: "/dev-tools/performance-monitor" },
          { label: "Analytics Dashboard", href: "/dev-tools/analytics-dashboard" },
        ],
      },
      {
        label: "Generators",
        href: "/dev-tools/snippet-generator",
        children: [
          { label: "Snippet Generator", href: "/dev-tools/snippet-generator" },
          { label: "Documentation Generator", href: "/dev-tools/documentation-generator" },
        ],
      },
    ],
  },

  /* ── Destinations Archive Variants ── */
  {
    title: "Destination Archive Variants",
    icon: MapPin,
    description: "Alternative destination archive templates",
    links: [
      { label: "Destinations (Default)", href: "/destinations" },
      { label: "Destinations (Simple)", href: "/destinations/simple" },
      { label: "Destinations (Test)", href: "/destinations/test" },
      { label: "Destinations (Enhanced)", href: "/destinations/enhanced" },
      { label: "Destinations (Legacy)", href: "/destinations/old" },
    ],
  },

  /* ── Tour Template Variants ── */
  {
    title: "Tour Template Variants",
    icon: Layers,
    description: "Alternative tour archive & single templates",
    links: [
      { label: "Tours Archive (Default)", href: "/tours" },
      { label: "Tours Archive (New)", href: "/tours/new" },
      {
        label: "Tour Single Variants",
        href: "/tours",
        children: ALL_TOURS.slice(0, 3).map((t) => ({
          label: `${t.title} (New)`,
          href: `/tours/${t.slug}/new`,
        })),
      },
      {
        label: "Tour Gallery Pages",
        href: "/tours",
        children: ALL_TOURS.slice(0, 3).map((t) => ({
          label: `${t.title} Gallery`,
          href: `/tours/${t.slug}/gallery`,
        })),
      },
    ],
  },

  /* ── Diagnostics ── */
  {
    title: "Diagnostics",
    icon: Award,
    description: "System diagnostics and health checks",
    links: [
      { label: "System Diagnostic", href: "/diagnostic" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Stats summary                                                      */
/* ------------------------------------------------------------------ */

const STATS = [
  { count: ALL_TOURS.length, label: "Tours" },
  { count: COUNTRIES.length, label: "Countries" },
  { count: DESTINATIONS.length, label: "Destinations" },
  { count: ALL_ACCOMMODATION.length, label: "Properties" },
  { count: TRAVEL_STYLES.length, label: "Travel Styles" },
  { count: TRAVELLER_TYPES.length, label: "Traveller Types" },
  { count: ACCOMMODATION_TYPES.length, label: "Property Types" },
  { count: BRANDS.length, label: "Brands" },
  { count: FACILITIES.length, label: "Facilities" },
  { count: ALL_BLOG_POSTS.length, label: "Articles" },
  { count: ALL_REVIEWS.length, label: "Reviews" },
  { count: ALL_TEAM_MEMBERS.length, label: "Team" },
  { count: SPECIALS_DATA.length, label: "Specials" },
  { count: ALL_FAQS.length, label: "FAQs" },
  { count: FAQ_CATEGORIES.length, label: "FAQ Categories" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SitemapPage() {
  return (
    <PageShell context="sitemap">
      {/* ── Stats bar ── */}
      <section className="py-section-md bg-muted">
        <Container>
          <div className="wp-sitemap__stats">
            {STATS.map((s) => (
              <div key={s.label} className="wp-sitemap__stat">
                <span className="wp-sitemap__stat-count">{s.count}</span>
                <span className="wp-sitemap__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Main sitemap grid ── */}
      <section className="py-section-lg bg-card">
        <Container>
          <div className="wp-sitemap__grid">
            {SITEMAP_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="wp-sitemap__section">
                  {/* Section header */}
                  <div className="wp-sitemap__section-header">
                    <div className="wp-sitemap__section-icon">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="wp-sitemap__section-title">{section.title}</h3>
                      {section.description && (
                        <span className="wp-sitemap__group-label">
                          {section.description}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  <ul className="wp-sitemap__list">
                    {section.links.map((link) => (
                      <li key={`${link.href}-${link.label}`}>
                        <Link to={link.href} className="wp-sitemap__link">
                          <ChevronRight className="wp-sitemap__link-icon" />
                          <span>{link.label}</span>
                        </Link>

                        {link.children && link.children.length > 0 && (
                          <ul className="wp-sitemap__children">
                            {link.children.map((child) => (
                              <li key={`${child.href}-${child.label}`}>
                                <Link
                                  to={child.href}
                                  className="wp-sitemap__child-link"
                                >
                                  {child.label}
                                </Link>

                                {/* Grandchildren (e.g. regions within countries) */}
                                {child.children && child.children.length > 0 && (
                                  <ul className="wp-sitemap__grandchildren">
                                    {child.children.map((gc) => (
                                      <li key={`${gc.href}-${gc.label}`}>
                                        <Link
                                          to={gc.href}
                                          className="wp-sitemap__grandchild-link"
                                        >
                                          {gc.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Discovery Prompt ── */}
      <section className="py-section-lg bg-muted border-y border-border">
        <Container maxWidth="narrow">
          <div className="wp-sitemap__discovery">
            <div className="wp-sitemap__discovery-icon">
              <Sparkles />
            </div>
            <h2>Can't find what you're looking for?</h2>
            <ParagraphBlock className="text-muted-foreground">
              Our safari designers are masters of the continent. If you have a
              specific request or can't find a destination, reach out and we'll
              map it for you.
            </ParagraphBlock>
            <Link to="/contact" className="wp-sitemap__discovery-link">
              Connect with a Specialist <ChevronRight className="wp-sitemap__link-icon" />
            </Link>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

export default SitemapPage;