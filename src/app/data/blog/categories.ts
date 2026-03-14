import type { BlogCategory } from "../types";

/**
 * Blog Categories (Taxonomy)
 *
 * 8 categories covering Africa, Asia, Europe, and cross-cutting themes.
 *
 * @module blog-categories
 * @category data/taxonomies
 * @wordpressTaxonomy category
 */
export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "cat-1",
    slug: "news",
    name: "News",
    description: "Latest updates from the world of travel and LightSpeed Tours.",
    postIds: ["post-1", "post-14", "post-19"],
  },
  {
    id: "cat-2",
    slug: "tour-operators",
    name: "Tour Operators",
    description: "Insights and advice for tour operators and industry professionals.",
    postIds: ["post-2", "post-6", "post-12", "post-17", "post-21", "post-24"],
  },
  {
    id: "cat-3",
    slug: "travel-tips",
    name: "Travel Tips",
    description: "Practical advice for planning your journey.",
    postIds: [
      "post-3", "post-4", "post-5", "post-7", "post-8", "post-9",
      "post-10", "post-11", "post-13", "post-15", "post-16", "post-18",
      "post-20", "post-22", "post-23", "post-34", "post-44",
    ],
  },
  {
    id: "cat-4",
    slug: "destination-guides",
    name: "Destination Guides",
    description: "In-depth guides to our favourite destinations across three continents.",
    postIds: [
      "post-25", "post-27", "post-30", "post-32", "post-33",
      "post-36", "post-37", "post-38", "post-40", "post-41", "post-43",
    ],
  },
  {
    id: "cat-5",
    slug: "conservation",
    name: "Conservation & Sustainability",
    description: "Stories of wildlife conservation, community impact, and responsible tourism.",
    postIds: ["post-31"],
  },
  {
    id: "cat-6",
    slug: "food-culture",
    name: "Food & Culture",
    description: "Culinary journeys, cultural insights, and the human side of travel.",
    postIds: ["post-26", "post-28", "post-35", "post-39"],
  },
  {
    id: "cat-7",
    slug: "photography",
    name: "Photography",
    description: "Tips, gear guides, and inspiration for travel photography.",
    postIds: [],
  },
  {
    id: "cat-8",
    slug: "adventure",
    name: "Adventure & Active",
    description: "Hiking, diving, trekking, and active travel experiences.",
    postIds: ["post-29", "post-42"],
  },
];

/**
 * Get blog category by slug.
 */
export function getBlogCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find(c => c.slug === slug);
}

/**
 * Get blog category by ID.
 */
export function getBlogCategoryById(id: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find(c => c.id === id);
}
