/**
 * FAQ Data Module — Aggregates all FAQ data.
 *
 * Total: 91 FAQs across 14 categories
 * - Original: 28 FAQs (faq-1 to faq-28) — 8 categories
 * - Expanded existing: 25 FAQs (faq-29 to faq-53)
 * - Wildlife & Safari: 8 FAQs (faq-54 to faq-61)
 * - Asia Travel: 8 FAQs (faq-62 to faq-69)
 * - Europe Travel: 8 FAQs (faq-70 to faq-77)
 * - Sustainability: 5 FAQs (faq-78 to faq-82)
 * - Family Travel: 5 FAQs (faq-83 to faq-87)
 * - Photography: 4 FAQs (faq-88 to faq-91)
 *
 * @module faqs
 * @category data
 */

export * from "./categories";
export {
  getFAQsByCategory,
  getFeaturedFAQs,
  getFAQsForContentType,
  searchFAQs,
} from "./data";

import { FAQS } from "./data";
import { FAQS_EXPANDED } from "./faqs-expanded";
import { FAQS_WILDLIFE } from "./faqs-wildlife";
import { FAQS_ASIA } from "./faqs-asia";
import { FAQS_EUROPE } from "./faqs-europe";
import { FAQS_SUSTAINABILITY } from "./faqs-sustainability";
import { FAQS_FAMILIES } from "./faqs-families";
import { FAQS_PHOTOGRAPHY } from "./faqs-photography";

/**
 * All FAQs from all files — 91 total.
 */
export const ALL_FAQS = [
  ...FAQS,
  ...FAQS_EXPANDED,
  ...FAQS_WILDLIFE,
  ...FAQS_ASIA,
  ...FAQS_EUROPE,
  ...FAQS_SUSTAINABILITY,
  ...FAQS_FAMILIES,
  ...FAQS_PHOTOGRAPHY,
];

/** Legacy alias for the original 28 */
export { FAQS } from "./data";

/**
 * Get FAQ by ID from all files.
 */
export function getFAQById(id: string) {
  return ALL_FAQS.find(f => f.id === id);
}

/**
 * Get FAQ by slug from all files.
 */
export function getFAQBySlug(slug: string) {
  return ALL_FAQS.find(f => f.slug === slug);
}

/**
 * Get all FAQs by category slug (across all files).
 */
export function getAllFAQsByCategory(categorySlug: string) {
  return ALL_FAQS.filter(f => f.categories.includes(categorySlug));
}

/**
 * Get all featured FAQs (across all files).
 */
export function getAllFeaturedFAQs() {
  return ALL_FAQS.filter(f => f.featured);
}

/**
 * Search all FAQs by query string.
 */
export function searchAllFAQs(query: string) {
  const lower = query.toLowerCase();
  return ALL_FAQS.filter(
    f =>
      f.question.toLowerCase().includes(lower) ||
      f.answer.toLowerCase().includes(lower) ||
      f.excerpt.toLowerCase().includes(lower)
  );
}

/**
 * Get most helpful FAQs sorted by helpfulCount.
 */
export function getMostHelpfulFAQs(count: number = 10) {
  return [...ALL_FAQS]
    .sort((a, b) => (b.helpfulCount ?? 0) - (a.helpfulCount ?? 0))
    .slice(0, count);
}

/**
 * Get most viewed FAQs sorted by viewCount.
 */
export function getMostViewedFAQs(count: number = 10) {
  return [...ALL_FAQS]
    .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
    .slice(0, count);
}

// ── Legacy category aliases ──────────────────────────────────────────
// Maintained for backward compatibility with older components.

const _byCategory = (slug: string) => ALL_FAQS.filter(f => f.categories.includes(slug));

export const FAQ_GENERAL = _byCategory("general");
export const FAQ_BOOKING = _byCategory("booking");
export const FAQ_TOURS = _byCategory("tours");
export const FAQ_DESTINATIONS = _byCategory("destinations");
export const FAQ_ACCOMMODATION = _byCategory("accommodation");
export const FAQ_PAYMENT = _byCategory("payment");
export const FAQ_TRAVEL = _byCategory("travel");
export const FAQ_SAFETY = _byCategory("safety");
export const FAQ_WILDLIFE = _byCategory("wildlife");
export const FAQ_ASIA = _byCategory("asia");
export const FAQ_EUROPE = _byCategory("europe");
export const FAQ_SUSTAINABILITY = _byCategory("sustainability");
export const FAQ_FAMILIES = _byCategory("families");
export const FAQ_PHOTOGRAPHY = _byCategory("photography");

export const FAQ_COMPANY = FAQ_GENERAL;
export const FAQ_CONTACT = FAQ_GENERAL;
export const FAQ_TOUR_SPECIFIC = FAQ_TOURS;
export const FAQ_DESTINATION = FAQ_DESTINATIONS;
export const FAQ_TRAVEL_LOGISTICS = FAQ_TRAVEL;
export const FAQ_TEAM = FAQ_GENERAL;

export const PAGE_FAQ_GENERAL = FAQ_GENERAL;
export const PAGE_FAQ_ABOUT = FAQ_COMPANY;
export const PAGE_FAQ_CONTACT = FAQ_CONTACT;
export const PAGE_FAQ_TEAM = FAQ_TEAM;
export const PAGE_FAQ_TOURS = FAQ_TOURS;
export const PAGE_FAQ_DESTINATIONS = FAQ_DESTINATIONS;
export const PAGE_FAQ_ACCOMMODATION = FAQ_ACCOMMODATION;
export const PAGE_FAQ_BOOKING = FAQ_BOOKING;
export const PAGE_FAQ_LOGISTICS = FAQ_TRAVEL_LOGISTICS;
