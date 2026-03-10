import type { BlogCategory } from "../types";

/**
 * Blog Categories (Taxonomy)
 * Categorizes blog posts.
 */
export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "cat-1",
    slug: "news",
    name: "News",
    description: "Latest updates from the world of African travel",
    postIds: ["post-1"],
  },
  {
    id: "cat-2",
    slug: "tour-operators",
    name: "Tour Operators",
    description: "Insights and advice for tour operators",
    postIds: ["post-2"],
  },
  {
    id: "cat-3",
    slug: "travel-tips",
    name: "Travel Tips",
    description: "Practical advice for African travel",
    postIds: ["post-3"],
  },
];

/**
 * Get blog category by slug.
 */
export function getBlogCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find(c => c.slug === slug);
}
