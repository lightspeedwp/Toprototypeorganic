/**
 * Reviews Data Module — Aggregates all review data from regional files.
 * 
 * Total: 41 reviews across 3 continents
 * - Africa: 15 reviews (rev-1 to rev-15)
 * - Asia: 13 reviews (rev-16 to rev-28)
 * - Europe: 13 reviews (rev-29 to rev-41)
 * 
 * Categories: 10 review categories
 * 
 * @module reviews
 * @category data
 */

export * from "./categories";
export { getReview } from "./data";

import { REVIEWS_DATA } from "./data";
import { REVIEWS_ASIA } from "./reviews-asia";
import { REVIEWS_EUROPE } from "./reviews-europe";

/**
 * All reviews from all continents.
 * 41 total reviews.
 */
export const ALL_REVIEWS = [...REVIEWS_DATA, ...REVIEWS_ASIA, ...REVIEWS_EUROPE];

/**
 * Default export alias — backward-compatible.
 * Components that imported REVIEWS will continue to work.
 */
export const REVIEWS = ALL_REVIEWS;

/**
 * Get review by ID from all regions.
 */
export function getReviewById(id: string) {
  return ALL_REVIEWS.find(r => r.id === id);
}

/**
 * Get review by slug from all regions.
 */
export function getReviewBySlug(slug: string) {
  return ALL_REVIEWS.find(r => r.slug === slug);
}

/**
 * Get reviews by tour ID.
 */
export function getReviewsByTourId(tourId: string) {
  return ALL_REVIEWS.filter(r => r.tourId === tourId);
}

/**
 * Get reviews by category ID.
 */
export function getReviewsByCategory(categoryId: string) {
  return ALL_REVIEWS.filter(r => r.categories?.includes(categoryId));
}

/**
 * Get reviews by destination ID.
 */
export function getReviewsByDestination(destinationId: string) {
  return ALL_REVIEWS.filter(r => r.destinationId === destinationId);
}

/**
 * Get reviews by group type.
 */
export function getReviewsByGroupType(groupType: string) {
  return ALL_REVIEWS.filter(r => r.groupType === groupType);
}

/**
 * Get average rating across all reviews.
 */
export function getAverageRating() {
  if (ALL_REVIEWS.length === 0) return 0;
  return ALL_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / ALL_REVIEWS.length;
}

/**
 * Get rating distribution (how many reviews per star rating).
 */
export function getRatingDistribution() {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ALL_REVIEWS.forEach(r => {
    distribution[r.rating] = (distribution[r.rating] || 0) + 1;
  });
  return distribution;
}
