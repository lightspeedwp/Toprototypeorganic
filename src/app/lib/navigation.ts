/**
 * Navigation Configuration and Utilities
 * 
 * Centralized navigation configuration for the entire application.
 * Maps URL paths to their WordPress template equivalents.
 * 
 * @module navigation
 * @category lib
 */

/**
 * Common navigation paths used throughout the application.
 * These are URL paths that map to React Router routes.
 */
export const COMMON_PATHS = {
  // Main navigation
  HOME: "/",
  TOURS: "/tours",
  DESTINATIONS: "/destinations",
  ACCOMMODATION: "/accommodation",
  SPECIALS: "/specials",
  BLOG: "/blog",
  ABOUT: "/about",
  CONTACT: "/contact",
  TEAM: "/team",
  FAQ: "/faq",
  FAQS: "/faqs",
  REVIEWS: "/reviews",

  // Conversion paths
  REVIEWS_HUB: "/reviews-hub",
  QUOTE: "/quote-request",
  GUIDES: "/destination-guides",
  INSURANCE: "/travel-insurance",
  NEWSLETTER: "/newsletter",
  PACKING_GUIDES: "/packing-guides",

  // Utility pages
  PRIVACY: "/privacy-policy",
  TERMS: "/terms-conditions",
  WHY_BOOK: "/why-book-with-us",
  TRIP_PLANNER: "/trip-planner",
  SEARCH: "/search",
  ADVANCED_SEARCH: "/search/advanced",

  // Booking & Account
  BOOKING: "/booking",
  BOOKING_CONFIRMATION: "/booking/confirmation",
  BOOKING_MANAGEMENT: "/booking/management",
  PAYMENT: "/payment",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  PASSENGERS: "/profile/passengers",
  SETTINGS: "/profile/settings",
  WISHLIST: "/wishlist",
  COMPARE: "/compare",
  GALLERY: "/gallery",

  // Developer Tools
  DEV_TOOLS: "/dev-tools",
  TEMPLATE_TESTER: "/dev-tools/template-tester",
  COMPONENT_SHOWCASE: "/dev-tools/component-showcase",
  COMPONENT_API: "/dev-tools/component-api",
  BLOCK_DOCS: "/dev-tools/block-documentation",
  DESIGN_BLOCKS: "/dev-tools/design-blocks",
  THEME_BLOCKS: "/dev-tools/theme-blocks",
  HEADER_FOOTER: "/dev-tools/header-footer",
  BUTTONS: "/dev-tools/buttons",
  SECTION_PRESETS: "/dev-tools/section-presets",
  ICONS: "/dev-tools/icons",
  LIVE_PREVIEW: "/dev-tools/live-preview",
  STYLE_GUIDE: "/dev-tools/style-guide",

  // Focused dev tool sub-pages
  TYPOGRAPHY_SPECIMENS: "/dev-tools/typography",
  SPACING_SCALE: "/dev-tools/spacing",
  SHADOW_SCALE: "/dev-tools/shadow",
  RADIUS_SPECIMENS: "/dev-tools/radius",
  CARD_INTERACTIONS: "/dev-tools/card-interactions",
  ANIMATIONS: "/dev-tools/animations",
} as const;

/**
 * Legacy page ID to URL path mapping.
 * Used for backward compatibility during migration from
 * useState-based routing to React Router.
 */
export const LEGACY_PAGE_ID_TO_PATH: Record<string, string> = {
  "home-page": "/",
  "tours-archive": "/tours",
  "tour-archive-wp": "/tours",
  "tour-single": "/tours/example",
  "tour-single-wp": "/tours/example",
  "tour-archive-new": "/tours/layout-b",
  "tour-single-new": "/tours/example/layout-b",
  "destinations-archive": "/destinations",
  "destination-archive-wp": "/destinations",
  "destination-single": "/destinations/example",
  "destination-single-wp": "/destinations/example",
  "accommodation-archive": "/accommodation",
  "accommodation-single": "/accommodation/example",
  "team-archive": "/team",
  "team-single": "/team/example",
  "specials-archive": "/specials",
  "special-single": "/specials/example",
  "reviews-archive": "/reviews",
  "blog-archive": "/blog",
  "blog-single": "/blog/example",
  "taxonomy-archive": "/travel-styles/adventure",
  "faq-page": "/faq",
  "about-page": "/about",
  "contact-page": "/contact",
  "reviews-hub-page": "/reviews-hub",
  "quote-request-page": "/quote-request",
  "destination-guides-hub-page": "/destination-guides",
  "travel-insurance-page": "/travel-insurance",
  "newsletter-signup-page": "/newsletter",
  "packing-guides-page": "/packing-guides",
  "privacy-policy-page": "/privacy-policy",
  "terms-conditions-page": "/terms-conditions",
  "why-book-with-us-page": "/why-book-with-us",
  "trip-planner-page": "/trip-planner",
  "booking-page": "/booking",
  "booking-confirmation-page": "/booking/confirmation",
  "booking-confirmation-page-enhanced": "/booking/confirmation/enhanced",
  "booking-management-page": "/booking/management",
  "payment-page": "/payment",
  "login-page": "/login",
  "register-page": "/register",
  "profile-page": "/profile",
  "saved-passengers-page": "/profile/passengers",
  "account-settings-page": "/profile/settings",
  "wishlist-page": "/wishlist",
  "tour-comparison-page": "/compare",
  "tour-gallery-page": "/gallery",
  "search-results-page": "/search",
  "advanced-search-results-page": "/search/advanced",
  "dev-tools": "/dev-tools",
  "dev-tools/template-tester": "/dev-tools/template-tester",
  "dev-tools/component-showcase": "/dev-tools/component-showcase",
  "dev-tools/component-api": "/dev-tools/component-api",
  "dev-tools/block-documentation": "/dev-tools/block-documentation",
  "dev-tools/design-blocks": "/dev-tools/design-blocks",
  "dev-tools/theme-blocks": "/dev-tools/theme-blocks",
  "dev-tools/header-footer-comparison": "/dev-tools/header-footer",
  "dev-tools/button-showcase": "/dev-tools/buttons",
  "dev-tools/section-presets": "/dev-tools/section-presets",
  "dev-tools/icon-library": "/dev-tools/icons",
  "dev-tools/live-preview": "/dev-tools/live-preview",
  "dev-tools/style-guide": "/dev-tools/style-guide",
};

/**
 * Resolve a navigation target to a URL path.
 * Handles both legacy page IDs and modern URL paths.
 * 
 * @param target - A legacy page ID or URL path
 * @returns URL path string
 */
export function resolveNavigationPath(target: string): string {
  // Already a URL path
  if (target.startsWith("/")) {
    return target;
  }
  // Check legacy mapping
  if (target in LEGACY_PAGE_ID_TO_PATH) {
    return LEGACY_PAGE_ID_TO_PATH[target];
  }
  // Fallback: treat as a path segment
  return `/${target}`;
}

/**
 * Generate a single content URL path.
 * 
 * @param type - Content type (tours, destinations, etc.)
 * @param slug - Content slug
 * @returns URL path
 */
export function getSinglePath(type: string, slug: string): string {
  return `/${type}/${slug}`;
}

/**
 * Generate a taxonomy archive URL path.
 * 
 * @param parentType - Parent content type
 * @param taxonomy - Taxonomy name  
 * @param slug - Term slug
 * @returns URL path
 */
export function getTaxonomyPath(parentType: string, taxonomy: string, slug: string): string {
  return `/${parentType}/${taxonomy}/${slug}`;
}

/**
 * Page metadata for navigation and display
 */
export interface PageMetadata {
  path: string;
  label: string;
  description: string;
  category: "core" | "archive" | "single" | "conversion" | "utility" | "booking" | "developer";
  wpTemplate?: string;
}

/**
 * Complete page registry with metadata (URL-based)
 */
export const PAGE_REGISTRY: Record<string, PageMetadata> = {
  "/": {
    path: "/",
    label: "Homepage",
    description: "Main landing page",
    category: "core",
    wpTemplate: "templates/front-page.html",
  },
  "/tours": {
    path: "/tours",
    label: "Tours",
    description: "All tours archive",
    category: "archive",
    wpTemplate: "templates/archive-tour.html",
  },
  "/destinations": {
    path: "/destinations",
    label: "Destinations",
    description: "All destinations archive",
    category: "archive",
    wpTemplate: "templates/archive-destination.html",
  },
  "/accommodation": {
    path: "/accommodation",
    label: "Accommodation",
    description: "Accommodation listings",
    category: "archive",
    wpTemplate: "templates/archive-accommodation.html",
  },
  "/team": {
    path: "/team",
    label: "Our Team",
    description: "Team members",
    category: "archive",
    wpTemplate: "templates/archive-team.html",
  },
  "/specials": {
    path: "/specials",
    label: "Special Offers",
    description: "Current promotions",
    category: "archive",
    wpTemplate: "templates/archive-special.html",
  },
  "/reviews": {
    path: "/reviews",
    label: "Reviews",
    description: "Customer reviews",
    category: "archive",
    wpTemplate: "templates/archive-review.html",
  },
  "/blog": {
    path: "/blog",
    label: "Blog",
    description: "Blog posts",
    category: "archive",
    wpTemplate: "templates/home.html",
  },
  "/faqs": {
    path: "/faqs",
    label: "FAQs",
    description: "Frequently asked questions",
    category: "archive",
    wpTemplate: "templates/archive-faq.html",
  },
  "/about": {
    path: "/about",
    label: "About",
    description: "Company information",
    category: "core",
    wpTemplate: "templates/page-about.html",
  },
  "/contact": {
    path: "/contact",
    label: "Contact",
    description: "Contact information and form",
    category: "core",
    wpTemplate: "templates/page-contact.html",
  },
  "/faq": {
    path: "/faq",
    label: "FAQ",
    description: "Frequently asked questions",
    category: "core",
    wpTemplate: "templates/page-faq.html",
  },
};