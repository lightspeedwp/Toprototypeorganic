import type { ReviewCategory } from "../types";

/**
 * Review Categories (Taxonomy)
 * 
 * Categorizes customer reviews by travel style, group type, and experience focus.
 * Updated March 13, 2026 — expanded from 5 to 10 categories.
 * 
 * @module review-categories
 * @category data/taxonomies
 * @wordpressTaxonomy review_category
 */
export const REVIEW_CATEGORIES: ReviewCategory[] = [
  {
    id: "cat-1",
    slug: "honeymoon",
    name: "Honeymoon",
    description: "Reviews from couples celebrating their honeymoon or romantic getaway",
    reviewIds: ["rev-1", "rev-7", "rev-16", "rev-22", "rev-29", "rev-36"],
  },
  {
    id: "cat-2",
    slug: "family",
    name: "Family",
    description: "Reviews from families traveling with children of all ages",
    reviewIds: ["rev-2", "rev-8", "rev-13", "rev-18", "rev-24", "rev-31", "rev-38"],
  },
  {
    id: "cat-3",
    slug: "solo",
    name: "Solo Travel",
    description: "Reviews from independent solo travelers exploring the world",
    reviewIds: ["rev-3", "rev-5", "rev-10", "rev-19", "rev-25", "rev-33", "rev-39"],
  },
  {
    id: "cat-4",
    slug: "adventure",
    name: "Adventure",
    description: "Reviews focused on adrenaline, wildlife encounters, and outdoor exploration",
    reviewIds: ["rev-3", "rev-4", "rev-5", "rev-9", "rev-11", "rev-14", "rev-17", "rev-20", "rev-27", "rev-32", "rev-35", "rev-40"],
  },
  {
    id: "cat-5",
    slug: "luxury",
    name: "Luxury",
    description: "Reviews of high-end, premium travel experiences",
    reviewIds: ["rev-1", "rev-4", "rev-7", "rev-12", "rev-15", "rev-22", "rev-28", "rev-30", "rev-36", "rev-41"],
  },
  {
    id: "cat-6",
    slug: "wildlife",
    name: "Wildlife & Safari",
    description: "Reviews centered on wildlife viewing and safari experiences",
    reviewIds: ["rev-2", "rev-4", "rev-6", "rev-9", "rev-11", "rev-13", "rev-14", "rev-17", "rev-20"],
  },
  {
    id: "cat-7",
    slug: "cultural",
    name: "Cultural Immersion",
    description: "Reviews highlighting authentic cultural encounters and local experiences",
    reviewIds: ["rev-3", "rev-8", "rev-10", "rev-16", "rev-19", "rev-21", "rev-23", "rev-26", "rev-33", "rev-34"],
  },
  {
    id: "cat-8",
    slug: "photography",
    name: "Photography",
    description: "Reviews from photography-focused tours and expeditions",
    reviewIds: ["rev-14", "rev-27", "rev-35", "rev-40"],
  },
  {
    id: "cat-9",
    slug: "group",
    name: "Group & Friends",
    description: "Reviews from groups of friends or organized group travel",
    reviewIds: ["rev-4", "rev-9", "rev-15", "rev-23", "rev-32", "rev-37"],
  },
  {
    id: "cat-10",
    slug: "wellness",
    name: "Wellness & Relaxation",
    description: "Reviews of wellness retreats, spa experiences, and mindful travel",
    reviewIds: ["rev-12", "rev-21", "rev-26", "rev-30", "rev-34"],
  },
];

/**
 * Get review category by slug
 */
export function getReviewCategory(slug: string): ReviewCategory | undefined {
  return REVIEW_CATEGORIES.find(c => c.slug === slug);
}

/**
 * Get review category by ID
 */
export function getReviewCategoryById(id: string): ReviewCategory | undefined {
  return REVIEW_CATEGORIES.find(c => c.id === id);
}

/**
 * Get all categories for a given review ID
 */
export function getCategoriesForReview(reviewId: string): ReviewCategory[] {
  return REVIEW_CATEGORIES.filter(c => c.reviewIds.includes(reviewId));
}
