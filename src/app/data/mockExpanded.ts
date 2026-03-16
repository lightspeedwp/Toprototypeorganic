/**
 * Expanded Mock Data
 * 
 * Aggregates ALL hand-crafted mock data from domain modules.
 * No more auto-generated filler data — every item is hand-crafted
 * with real content across 3 continents + Indian Ocean.
 * 
 * Totals:
 *   - Tours: 61 (35 Africa + 13 Asia + 13 Europe)
 *   - Destinations: 87 (across 6 continents)
 *   - Accommodation: 50 (24 Africa + 8 Asia + 8 Europe + 10 expansion)
 *   - Blog Posts: 44 (24 Africa + 10 Asia + 10 Europe)
 *   - Reviews: 41 (15 Africa + 13 Asia + 13 Europe)
 *   - Team Members: 18 (5 original + 13 expanded)
 *   - Specials: from specials/data
 *   - FAQs: 91 (across 14 categories)
 * 
 * @module mockExpanded
 * @category data
 */

import { ALL_TOURS as TOURS_ALL } from "./tours/index";
import { DESTINATIONS } from "./destinations/index";
import { CONTINENTS } from "./destinations/continents";
import { ALL_ACCOMMODATION as ACCOMMODATION_ALL } from "./accommodation/index";
import { ACCOMMODATION_TYPES } from "./taxonomies/accommodation-types";
import { ALL_BLOG_POSTS as BLOG_ALL } from "./blog/index";
import { BLOG_CATEGORIES } from "./blog/categories";
import { BLOG_TAGS } from "./blog/tags";
import { ALL_REVIEWS as REVIEWS_ALL } from "./reviews/index";
import { REVIEWS_DATA } from "./reviews/data";
export { REVIEWS_DATA as REVIEWS };
import { SPECIALS } from "./specials/data";
import { ALL_TEAM_MEMBERS } from "./team/index";
import { TEAM_MEMBERS } from "./team/members";
export { TEAM_MEMBERS }; // Re-export for centralized access
import { TRAVEL_STYLES } from "./taxonomies/travel-styles";
import { BRANDS } from "./taxonomies/brands";
import { FACILITIES } from "./taxonomies/facilities";
import { ALL_FAQS } from "./faqs/index";

import type { 
  Tour, Destination, Accommodation, BlogPost, Review, Special, TeamMember,
  Continent, TravelStyle, AccommodationType, Brand, Facility, BlogCategory, BlogTag 
} from "./types";

// ── Hand-crafted data aggregations (no generators) ──────────────────────

/** All 61 hand-crafted tours */
export const ALL_TOURS: Tour[] = [...TOURS_ALL];

/** All 87 hand-crafted destinations */
export const ALL_DESTINATIONS: Destination[] = [...DESTINATIONS];

/** All 50 hand-crafted accommodation properties */
export const ALL_ACCOMMODATION: Accommodation[] = [...ACCOMMODATION_ALL];

/** All 44 hand-crafted blog posts */
export const ALL_BLOG_POSTS: BlogPost[] = [...BLOG_ALL];

/** All 41 hand-crafted reviews */
export const ALL_REVIEWS: Review[] = [...REVIEWS_ALL];

/** All specials */
export const ALL_SPECIALS: Special[] = [...SPECIALS];

/** All 18 hand-crafted team members */
export const ALL_TEAM: TeamMember[] = [...ALL_TEAM_MEMBERS];

/** All 91 hand-crafted FAQs */
export { ALL_FAQS };

// ── Taxonomy aggregations (no generators) ───────────────────────────────

export const ALL_CONTINENTS: Continent[] = [...CONTINENTS];
export const ALL_TRAVEL_STYLES: TravelStyle[] = [...TRAVEL_STYLES];
export const ALL_ACCOMMODATION_TYPES: AccommodationType[] = [...ACCOMMODATION_TYPES];
export const ALL_BRANDS: Brand[] = [...BRANDS];
export const ALL_FACILITIES: Facility[] = [...FACILITIES];
export const ALL_BLOG_CATEGORIES: BlogCategory[] = [...BLOG_CATEGORIES];
export const ALL_BLOG_TAGS: BlogTag[] = [...BLOG_TAGS];

// Helper Functions

/**
 * Get tours filtered by travel style.
 */
export function getToursByTravelStyle(styleId: string): Tour[] {
  return ALL_TOURS.filter(tour => tour.travelStyles.includes(styleId));
}

/**
 * Get destinations by continent.
 */
export function getDestinationsByContinent(continentId: string): Destination[] {
  return ALL_DESTINATIONS.filter(dest => dest.continentId === continentId);
}

/**
 * Get accommodation by type.
 */
export function getAccommodationByType(typeId: string): Accommodation[] {
  return ALL_ACCOMMODATION.filter(acc => acc.types.includes(typeId));
}

/**
 * Get accommodation by brand.
 */
export function getAccommodationByBrand(brandId: string): Accommodation[] {
  return ALL_ACCOMMODATION.filter(acc => acc.brands.includes(brandId));
}

/**
 * Get blog posts by category.
 */
export function getBlogPostsByCategory(categoryId: string): BlogPost[] {
  return ALL_BLOG_POSTS.filter(post => post.categories.includes(categoryId));
}

/**
 * Get blog posts by tag.
 */
export function getBlogPostsByTag(tagId: string): BlogPost[] {
  return ALL_BLOG_POSTS.filter(post => post.tags.includes(tagId));
}

/**
 * Get blog posts by author.
 */
export function getBlogPostsByAuthor(authorName: string): BlogPost[] {
  return ALL_BLOG_POSTS.filter(post => post.author === authorName);
}

/**
 * Get unique blog authors.
 */
export function getBlogAuthors(): string[] {
  return Array.from(new Set(ALL_BLOG_POSTS.map(post => post.author)));
}

/**
 * Get reviews for a specific content type (tour, destination, accommodation).
 */
export function getReviewsByContentType(type: 'tour' | 'destination' | 'accommodation', id: string): Review[] {
  if (type === 'tour') return ALL_REVIEWS.filter(r => r.tourId === id);
  if (type === 'destination') return ALL_REVIEWS.filter(r => r.destinationId === id);
  if (type === 'accommodation') return ALL_REVIEWS.filter(r => r.accommodationId === id);
  return [];
}

/**
 * Generic pagination helper.
 */
export function paginate<T>(items: T[], page: number = 1, limit: number = 12): {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
} {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / limit);

  return {
    data: paginatedItems,
    total: items.length,
    totalPages,
    currentPage: page,
  };
}