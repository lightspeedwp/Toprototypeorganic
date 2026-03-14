/**
 * Blog Data Module — Aggregates all blog post data.
 *
 * Total: 44 blog posts across 8 categories and 30 tags
 * - Original: 24 posts (post-1 to post-24) — Africa-focused
 * - Asia: 10 posts (post-25 to post-34)
 * - Europe: 10 posts (post-35 to post-44)
 *
 * Categories: News, Tour Operators, Travel Tips, Destination Guides,
 *             Conservation & Sustainability, Food & Culture, Photography,
 *             Adventure & Active
 *
 * @module blog
 * @category data
 */

export * from "./categories";
export * from "./tags";
export { getBlogPost, getBlogPostsByAuthor } from "./posts";

import { BLOG_POSTS } from "./posts";
import { BLOG_POSTS_ASIA } from "./posts-asia";
import { BLOG_POSTS_EUROPE } from "./posts-europe";

/**
 * All blog posts from all files.
 * 44 total posts.
 */
export const ALL_BLOG_POSTS = [...BLOG_POSTS, ...BLOG_POSTS_ASIA, ...BLOG_POSTS_EUROPE];

/** Legacy alias for the original 24 */
export { BLOG_POSTS } from "./posts";

/**
 * Get blog post by ID from all files.
 */
export function getBlogPostById(id: string) {
  return ALL_BLOG_POSTS.find(p => p.id === id);
}

/**
 * Get blog post by slug from all files.
 */
export function getBlogPostBySlug(slug: string) {
  return ALL_BLOG_POSTS.find(p => p.slug === slug);
}

/**
 * Get blog posts by category ID.
 */
export function getBlogPostsByCategory(categoryId: string) {
  return ALL_BLOG_POSTS.filter(p => p.categories.includes(categoryId));
}

/**
 * Get blog posts by tag (string match — matches tag strings in posts).
 */
export function getBlogPostsByTag(tagName: string) {
  const lower = tagName.toLowerCase();
  return ALL_BLOG_POSTS.filter(p =>
    p.tags.some(t => t.toLowerCase() === lower)
  );
}

/**
 * Get recent blog posts sorted by date (newest first).
 */
export function getRecentBlogPosts(count: number = 6) {
  return [...ALL_BLOG_POSTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
