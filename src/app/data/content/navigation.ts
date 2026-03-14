/**
 * Centralized Navigation & Template-Part Data
 *
 * Single source of truth for all navigation structures consumed by
 * the shared template-part components (Header, Footer, MobileMenu,
 * Breadcrumbs).
 *
 * WordPress Mapping:
 *   - PRIMARY_NAV     → `core/navigation` block (header)
 *   - FOOTER_NAV      → `core/navigation` blocks (footer columns)
 *   - SOCIAL_LINKS    → Social icons block / customizer
 *   - CONTACT_INFO    → Site options / customizer
 *   - MOBILE_SECTIONS → Mobile navigation overlay sections
 *
 * Data shapes are defined in `/src/app/data/types/template-parts.ts`.
 *
 * @module content-navigation
 * @category data/content
 */

import type {
  NavItem,
  NavSection,
  SocialLink,
  ContactInfo,
  BreadcrumbTrail,
} from "../types/template-parts";

/* ================================================================
   PRIMARY NAVIGATION
   Consumed by: Header (desktop), MobileMenu
   Maps to: core/navigation block in parts/header.html
   ================================================================ */

export const PRIMARY_NAV: NavItem[] = [
  { id: "nav-tours",          label: "Expeditions",    href: "/tours" },
  { id: "nav-destinations",   label: "Territories",    href: "/destinations" },
  { id: "nav-accommodation",  label: "Sanctuaries",    href: "/accommodation" },
  { id: "nav-blog",           label: "Chronicles",     href: "/blog" },
  { id: "nav-sustainability", label: "Conservation",   href: "/sustainability" },
  { id: "nav-about",          label: "The Studio",     href: "/about" },
];

/* ================================================================
   FOOTER NAVIGATION
   Consumed by: FooterNew
   Maps to: core/navigation blocks in parts/footer.html
   ================================================================ */

export const FOOTER_NAV: NavSection[] = [
  {
    id: "footer-expeditions",
    heading: "Expeditions",
    items: [
      { id: "ft-tours",        label: "All Tours",          href: "/tours" },
      { id: "ft-specials",     label: "Exclusive Specials",  href: "/specials" },
      { id: "ft-destinations", label: "Our Territories",     href: "/destinations" },
      { id: "ft-reviews",      label: "Traveller Reviews",   href: "/reviews" },
    ],
  },
  {
    id: "footer-sanctuary",
    heading: "Sanctuary",
    items: [
      { id: "ft-accommodation", label: "Estate Collection",   href: "/accommodation" },
      { id: "ft-sustainability", label: "Conservation",        href: "/sustainability" },
      { id: "ft-studio",        label: "The Studio",          href: "/about" },
      { id: "ft-blog",          label: "The Chronicles",      href: "/blog" },
      { id: "ft-contact",       label: "Expert Concierge",    href: "/contact" },
    ],
  },
  {
    id: "footer-intelligence",
    heading: "Intelligence",
    items: [
      { id: "ft-faq",     label: "Travel FAQ",          href: "/faq" },
      { id: "ft-guides",  label: "Destination Guides",  href: "/destination-guides" },
      { id: "ft-terms",   label: "Booking Protocols",   href: "/terms-conditions" },
      { id: "ft-privacy", label: "Privacy Policy",      href: "/privacy-policy" },
      { id: "ft-dev",     label: "Digital Studio",      href: "/dev-tools" },
    ],
  },
];

/* ================================================================
   SOCIAL LINKS
   Consumed by: Footer, MobileMenu
   Maps to: core/social-links block
   ================================================================ */

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "social-facebook",  platform: "facebook",  url: "https://facebook.com",  label: "Facebook" },
  { id: "social-instagram", platform: "instagram", url: "https://instagram.com", label: "Instagram" },
  { id: "social-twitter",   platform: "twitter",   url: "https://x.com",         label: "X (Twitter)" },
  { id: "social-linkedin",  platform: "linkedin",  url: "https://linkedin.com",  label: "LinkedIn" },
  { id: "social-youtube",   platform: "youtube",   url: "https://youtube.com",   label: "YouTube" },
];

/* ================================================================
   CONTACT INFO
   Consumed by: Footer, ContactPage, MobileMenu
   Maps to: WordPress customizer / site options
   ================================================================ */

export const CONTACT_INFO: ContactInfo = {
  phone: "+1 555-0123",
  email: "info@lightspeedtours.com",
  address: "123 Safari Way, Cape Town, South Africa",
};

/* ================================================================
   HEADER CTA
   The primary call-to-action button rendered in the header.
   ================================================================ */

export const HEADER_CTA: NavItem = {
  id: "header-cta",
  label: "Begin Journey",
  href: "/contact",
};

/* ================================================================
   BREADCRUMB TRAILS
   Pre-defined breadcrumb paths keyed by page context.
   Pages look up their breadcrumb trail via getBreadcrumbTrail(context).
   ================================================================ */

export const BREADCRUMB_TRAILS: BreadcrumbTrail[] = [
  /* ── Static pages ──────────────────────────────────────────── */
  { context: "about",              items: [{ label: "Home", href: "/" }, { label: "Our Story" }] },
  { context: "contact",            items: [{ label: "Home", href: "/" }, { label: "Contact Us" }] },
  { context: "faq",                items: [{ label: "Home", href: "/" }, { label: "FAQ" }] },
  { context: "faqs-archive",       items: [{ label: "Home", href: "/" }, { label: "All FAQs" }] },
  { context: "why-book-with-us",   items: [{ label: "Home", href: "/" }, { label: "Why Book With Us" }] },
  { context: "sustainability",     items: [{ label: "Home", href: "/" }, { label: "Conservation" }] },
  { context: "privacy-policy",     items: [{ label: "Home", href: "/" }, { label: "Privacy Policy" }] },
  { context: "terms-conditions",   items: [{ label: "Home", href: "/" }, { label: "Terms & Conditions" }] },
  { context: "newsletter",         items: [{ label: "Home", href: "/" }, { label: "Newsletter" }] },
  { context: "quote-request",      items: [{ label: "Home", href: "/" }, { label: "Request a Quote" }] },
  { context: "destination-guides", items: [{ label: "Home", href: "/" }, { label: "Destination Guides" }] },
  { context: "travel-insurance",   items: [{ label: "Home", href: "/" }, { label: "Travel Insurance" }] },
  { context: "packing-guides",     items: [{ label: "Home", href: "/" }, { label: "Packing Guides" }] },
  { context: "sitemap",            items: [{ label: "Home", href: "/" }, { label: "Sitemap" }] },
  { context: "search",             items: [{ label: "Home", href: "/" }, { label: "Search Results" }] },

  /* ── Archives ──────────────────────────────────────────────── */
  { context: "tours-archive",         items: [{ label: "Home", href: "/" }, { label: "Tours" }] },
  { context: "destinations-archive",  items: [{ label: "Home", href: "/" }, { label: "Destinations" }] },
  { context: "accommodation-archive", items: [{ label: "Home", href: "/" }, { label: "Accommodation" }] },
  { context: "blog-archive",          items: [{ label: "Home", href: "/" }, { label: "Blog" }] },
  { context: "specials-archive",      items: [{ label: "Home", href: "/" }, { label: "Specials" }] },
  { context: "team-archive",          items: [{ label: "Home", href: "/" }, { label: "Our Team" }] },
  { context: "reviews-archive",       items: [{ label: "Home", href: "/" }, { label: "Reviews" }] },
  { context: "reviews-hub",           items: [{ label: "Home", href: "/" }, { label: "Reviews" }] },

  /* ── Dev tools ─────────────────────────────────────────────── */
  { context: "dev-tools",          items: [{ label: "Home", href: "/" }, { label: "Dev Tools" }] },
  { context: "component-showcase", items: [{ label: "Home", href: "/" }, { label: "Dev Tools", href: "/dev-tools" }, { label: "Component Showcase" }] },
  { context: "component-api",      items: [{ label: "Home", href: "/" }, { label: "Dev Tools", href: "/dev-tools" }, { label: "API Reference" }] },

  /* ── User account & utility ────────────────────────────────── */
  { context: "trip-planner",          items: [{ label: "Home", href: "/" }, { label: "Trip Planner" }] },
  { context: "wishlist",              items: [{ label: "Home", href: "/" }, { label: "Wishlist" }] },
  { context: "profile",              items: [{ label: "Home", href: "/" }, { label: "My Profile" }] },
  { context: "booking",              items: [{ label: "Home", href: "/" }, { label: "Booking" }] },
  { context: "booking-confirmation",  items: [{ label: "Home", href: "/" }, { label: "Booking", href: "/booking" }, { label: "Confirmation" }] },
  { context: "travel-styles",        items: [{ label: "Home", href: "/" }, { label: "Travel Styles" }] },
  { context: "tour-comparison",      items: [{ label: "Home", href: "/" }, { label: "Tours", href: "/tours" }, { label: "Compare Tours" }] },
];

/**
 * Helper: look up a breadcrumb trail by page context key.
 *
 * @param context - The page/template context (e.g., "home", "tours-archive")
 * @returns The matching BreadcrumbTrail, or undefined if not found.
 */
export function getBreadcrumbTrail(context: string): BreadcrumbTrail | undefined {
  return BREADCRUMB_TRAILS.find((t) => t.context === context);
}