/**
 * Expanded Mock Data
 * 
 * Aggregates base mock data and programmatically generated data to provide
 * large datasets (36+ items) for testing pagination, filtering, and search.
 * 
 * @module mockExpanded
 * @category data
 */

import { TOURS } from "./tours/data";
import { DESTINATIONS } from "./destinations/index";
import { CONTINENTS } from "./destinations/continents";
import { ACCOMMODATION } from "./accommodation/properties";
import { ACCOMMODATION_TYPES } from "./taxonomies/accommodation-types";
import { BLOG_POSTS } from "./blog/posts";
import { BLOG_POSTS_ASIA } from "./blog/posts-asia";
import { BLOG_POSTS_EUROPE } from "./blog/posts-europe";
import { BLOG_CATEGORIES } from "./blog/categories";
import { BLOG_TAGS } from "./blog/tags";
import { ALL_REVIEWS as REVIEWS_ALL } from "./reviews/index";
import { REVIEWS_DATA as REVIEWS } from "./reviews/data";
export { REVIEWS };
import { SPECIALS } from "./specials/data";
import { ALL_TEAM_MEMBERS } from "./team/index";
import { TEAM_MEMBERS } from "./team/members";
export { TEAM_MEMBERS }; // Re-export for centralized access
import { TRAVEL_STYLES } from "./taxonomies/travel-styles";
import { BRANDS } from "./taxonomies/brands";
import { FACILITIES } from "./taxonomies/facilities";

import { 
  generateAdditionalTours, 
  generateAdditionalDestinations, 
  generateAdditionalAccommodation, 
  generateAdditionalBlogPosts, 
  generateAdditionalReviews, 
  generateAdditionalSpecials, 
  generateAdditionalTeamMembers,
  EXPANDED_CONTINENTS,
  EXPANDED_TRAVEL_STYLES,
  EXPANDED_ACCOMMODATION_TYPES,
  EXPANDED_BRANDS,
  EXPANDED_FACILITIES,
  EXPANDED_BLOG_CATEGORIES,
  EXPANDED_BLOG_TAGS
} from "./generators";

import type { 
  Tour, Destination, Accommodation, BlogPost, Review, Special, TeamMember,
  Continent, TravelStyle, AccommodationType, Brand, Facility, BlogCategory, BlogTag 
} from "./types";

// Combine base data with generated data
export const ALL_TOURS: Tour[] = [...TOURS, ...generateAdditionalTours(100)];
export const ALL_DESTINATIONS: Destination[] = [...DESTINATIONS, ...generateAdditionalDestinations(100)];
export const ALL_ACCOMMODATION: Accommodation[] = [...ACCOMMODATION, ...generateAdditionalAccommodation(100)];
export const ALL_BLOG_POSTS: BlogPost[] = [...BLOG_POSTS, ...BLOG_POSTS_ASIA, ...BLOG_POSTS_EUROPE];
export const ALL_REVIEWS: Review[] = [...REVIEWS_ALL];
export const ALL_SPECIALS: Special[] = [...SPECIALS, ...generateAdditionalSpecials(5)];
export const ALL_TEAM: TeamMember[] = [...ALL_TEAM_MEMBERS];

// Export expanded taxonomies
export const ALL_CONTINENTS: Continent[] = [...CONTINENTS, ...EXPANDED_CONTINENTS.filter(c => !CONTINENTS.some(existing => existing.id === c.id))];
export const ALL_TRAVEL_STYLES: TravelStyle[] = [...TRAVEL_STYLES, ...EXPANDED_TRAVEL_STYLES.filter(s => !TRAVEL_STYLES.some(existing => existing.id === s.id))];
export const ALL_ACCOMMODATION_TYPES: AccommodationType[] = [...ACCOMMODATION_TYPES, ...EXPANDED_ACCOMMODATION_TYPES.filter(t => !ACCOMMODATION_TYPES.some(existing => existing.id === t.id))];
export const ALL_BRANDS: Brand[] = [...BRANDS, ...EXPANDED_BRANDS.filter(b => !BRANDS.some(existing => existing.id === b.id))];
export const ALL_FACILITIES: Facility[] = [...FACILITIES, ...EXPANDED_FACILITIES.filter(f => !FACILITIES.some(existing => existing.id === f.id))];
export const ALL_BLOG_CATEGORIES: BlogCategory[] = [...BLOG_CATEGORIES, ...EXPANDED_BLOG_CATEGORIES.filter(c => !BLOG_CATEGORIES.some(existing => existing.id === c.id))];
export const ALL_BLOG_TAGS: BlogTag[] = [...BLOG_TAGS, ...EXPANDED_BLOG_TAGS.filter(t => !BLOG_TAGS.some(existing => existing.id === t.id))];

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