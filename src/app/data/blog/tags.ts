import type { BlogTag } from "../types";

/**
 * Blog Tags (Taxonomy)
 * Tags for blog posts.
 */
export const BLOG_TAGS: BlogTag[] = [
  {
    id: "tag-1",
    slug: "botswana",
    name: "Botswana",
    description: "Articles related to Botswana's safari experiences",
    postIds: ["post-1"],
  },
  {
    id: "tag-2",
    slug: "wildlife",
    name: "Wildlife",
    description: "Articles about wildlife viewing and conservation",
    postIds: ["post-1"],
  },
  {
    id: "tag-3",
    slug: "luxury-safari",
    name: "Luxury Safari",
    description: "Articles on high-end safari experiences",
    postIds: ["post-1"],
  },
  {
    id: "tag-4",
    slug: "responsible-travel",
    name: "Responsible Travel",
    description: "Articles on sustainable and ethical travel practices",
    postIds: ["post-2"],
  },
  {
    id: "tag-5",
    slug: "community-tourism",
    name: "Community Tourism",
    description: "Articles about engaging with local communities",
    postIds: ["post-2"],
  },
  {
    id: "tag-6",
    slug: "best-practices",
    name: "Best Practices",
    description: "Articles on industry standards and recommendations",
    postIds: ["post-2"],
  },
  {
    id: "tag-7",
    slug: "packing-tips",
    name: "Packing Tips",
    description: "Articles on what to pack for a safari",
    postIds: ["post-3"],
  },
  {
    id: "tag-8",
    slug: "safari-preparation",
    name: "Safari Preparation",
    description: "Articles on preparing for a safari trip",
    postIds: ["post-3"],
  },
  {
    id: "tag-9",
    slug: "travel-advice",
    name: "Travel Advice",
    description: "Articles with general travel tips and information",
    postIds: ["post-3"],
  },
];

/**
 * Get blog tag by slug.
 */
export function getBlogTag(slug: string): BlogTag | undefined {
  return BLOG_TAGS.find(t => t.slug === slug);
}
