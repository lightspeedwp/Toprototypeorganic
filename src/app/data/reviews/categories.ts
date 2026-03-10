import type { ReviewCategory } from "../types";

/**
 * Review Categories (Taxonomy)
 * Categorizes customer reviews.
 */
export const REVIEW_CATEGORIES: ReviewCategory[] = [
  {
    id: "cat-1",
    slug: "honeymoon",
    name: "Honeymoon",
    description: "Reviews from couples on their honeymoon",
  },
  {
    id: "cat-2",
    slug: "family",
    name: "Family",
    description: "Reviews from families traveling with children",
  },
  {
    id: "cat-3",
    slug: "solo",
    name: "Solo Travel",
    description: "Reviews from solo travelers",
  },
  {
    id: "cat-4",
    slug: "adventure",
    name: "Adventure",
    description: "Reviews focused on adventure activities",
  },
  {
    id: "cat-5",
    slug: "luxury",
    name: "Luxury",
    description: "Reviews of luxury experiences",
  },
];

/**
 * Get review category by slug
 */
export function getReviewCategory(slug: string): ReviewCategory | undefined {
  return REVIEW_CATEGORIES.find(c => c.slug === slug);
}
