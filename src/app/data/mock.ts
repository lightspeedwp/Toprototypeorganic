/**
 * Mock Data (Legacy / Aggregated)
 * 
 * @deprecated This barrel file is maintained for backward compatibility only.
 * NEW CODE should import from specific domain files instead:
 *   - Tours: import { TOURS } from "../data/tours"
 *   - Destinations: import { DESTINATIONS } from "../data/destinations"
 *   - Accommodation: import { ACCOMMODATION } from "../data/accommodation"
 *   - Blog: import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blog"
 *   - Reviews: import { REVIEWS } from "../data/reviews"
 *   - Team: import { TEAM_MEMBERS } from "../data/team"
 *   - Specials: import { SPECIALS } from "../data/specials"
 *   - FAQs: import { FAQ_GENERAL } from "../data/faqs"
 *   - CTA: import { CTA_TOURS_ARCHIVE } from "../data/cta"
 *   - Expanded (36+): import { ALL_TOURS } from "../data/mockExpanded"
 * 
 * @module mock
 * @category data
 */

// Re-export everything from domain files
export * from "./tours";
export * from "./destinations";
export * from "./accommodation";
export * from "./blog";
export * from "./common";
export * from "./insurance";
export * from "./packing";
export * from "./site-content";
export * from "./homepage";
export * from "./cta";

// Re-export specific items from enhanced modules with legacy aliases
import { REVIEWS_DATA } from "./reviews/data";
import { ALL_REVIEWS } from "./reviews/index";
export { REVIEWS_DATA };
export const REVIEWS = ALL_REVIEWS;
// Also export review categories
export { REVIEW_CATEGORIES } from "./reviews/categories";

import { TEAM_MEMBERS } from "./team/members";
export { TEAM_MEMBERS };
import { ALL_TEAM_MEMBERS } from "./team/index";
export const TEAM_DATA = ALL_TEAM_MEMBERS;
export const TEAM = ALL_TEAM_MEMBERS;
// Also export TEAM_ROLES for backward compatibility
export { TEAM_ROLES } from "./team/roles";

import { SPECIALS_DATA } from "./specials/data";
export { SPECIALS_DATA };
export const SPECIALS = SPECIALS_DATA;
// Also export special categories
export { SPECIAL_CATEGORIES } from "./specials/categories";

// Re-export FAQs
export * from "./faqs";

// Re-export content helpers (heroes, page-section FAQs)
export { getHeroContent, HERO_CONTENT } from "./content/heroes";
export { getPageSectionFAQs, PAGE_SECTION_FAQS } from "./content/faqs";

// Re-export navigation / template-part data
export {
  PRIMARY_NAV,
  FOOTER_NAV as FOOTER_NAV_SECTIONS,
  SOCIAL_LINKS,
  CONTACT_INFO,
  HEADER_CTA,
  BREADCRUMB_TRAILS,
  getBreadcrumbTrail,
} from "./content/navigation";