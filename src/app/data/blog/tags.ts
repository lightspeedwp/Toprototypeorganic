import type { BlogTag } from "../types";

/**
 * Blog Tags (Taxonomy)
 *
 * 30 tags covering Africa, Asia, Europe, and cross-cutting topics.
 *
 * @module blog-tags
 * @category data/taxonomies
 * @wordpressTaxonomy post_tag
 */
export const BLOG_TAGS: BlogTag[] = [
  // ── Africa ──────────────────────────────────────────────────────────
  {
    id: "tag-1",
    slug: "botswana",
    name: "Botswana",
    description: "Articles related to Botswana's safari experiences.",
    postIds: ["post-1", "post-9"],
  },
  {
    id: "tag-2",
    slug: "wildlife",
    name: "Wildlife",
    description: "Articles about wildlife viewing and conservation.",
    postIds: ["post-1", "post-4", "post-5", "post-7", "post-8", "post-14", "post-16", "post-24", "post-33"],
  },
  {
    id: "tag-3",
    slug: "luxury-safari",
    name: "Luxury Safari",
    description: "Articles on high-end safari experiences.",
    postIds: ["post-1", "post-12", "post-19"],
  },
  {
    id: "tag-4",
    slug: "responsible-travel",
    name: "Responsible Travel",
    description: "Articles on sustainable and ethical travel practices.",
    postIds: ["post-2", "post-6", "post-24", "post-31"],
  },
  {
    id: "tag-5",
    slug: "community-tourism",
    name: "Community Tourism",
    description: "Articles about engaging with local communities.",
    postIds: ["post-2"],
  },
  {
    id: "tag-6",
    slug: "best-practices",
    name: "Best Practices",
    description: "Articles on industry standards and recommendations.",
    postIds: ["post-2"],
  },
  {
    id: "tag-7",
    slug: "packing-tips",
    name: "Packing Tips",
    description: "Articles on what to pack for your trip.",
    postIds: ["post-3"],
  },
  {
    id: "tag-8",
    slug: "safari-preparation",
    name: "Safari Preparation",
    description: "Articles on preparing for a safari trip.",
    postIds: ["post-3", "post-10"],
  },
  {
    id: "tag-9",
    slug: "travel-advice",
    name: "Travel Advice",
    description: "General travel tips and information.",
    postIds: ["post-3"],
  },
  {
    id: "tag-10",
    slug: "south-africa",
    name: "South Africa",
    description: "Articles about South Africa's travel experiences.",
    postIds: ["post-7", "post-13"],
  },
  {
    id: "tag-11",
    slug: "conservation",
    name: "Conservation",
    description: "Wildlife conservation and environmental stewardship.",
    postIds: ["post-6", "post-14", "post-31"],
  },
  {
    id: "tag-12",
    slug: "photography",
    name: "Photography",
    description: "Travel and wildlife photography.",
    postIds: ["post-8", "post-38"],
  },

  // ── Asia ─────────────────────────────────────────────────────────────
  {
    id: "tag-13",
    slug: "thailand",
    name: "Thailand",
    description: "Articles about Thailand's temples, food, and experiences.",
    postIds: ["post-25", "post-31", "post-34"],
  },
  {
    id: "tag-14",
    slug: "japan",
    name: "Japan",
    description: "Articles about Japanese culture, seasons, and travel.",
    postIds: ["post-26", "post-32"],
  },
  {
    id: "tag-15",
    slug: "sri-lanka",
    name: "Sri Lanka",
    description: "Articles about Sri Lanka's tea country, wildlife, and railways.",
    postIds: ["post-27", "post-33"],
  },
  {
    id: "tag-16",
    slug: "vietnam",
    name: "Vietnam",
    description: "Articles about Vietnam's food, culture, and landscapes.",
    postIds: ["post-28", "post-34"],
  },
  {
    id: "tag-17",
    slug: "indonesia",
    name: "Indonesia",
    description: "Articles about Indonesia's marine life and natural wonders.",
    postIds: ["post-29"],
  },
  {
    id: "tag-18",
    slug: "cambodia",
    name: "Cambodia",
    description: "Articles about Cambodia's temples and cultural heritage.",
    postIds: ["post-30", "post-34"],
  },
  {
    id: "tag-19",
    slug: "culture",
    name: "Culture",
    description: "Cultural experiences, etiquette, and local traditions.",
    postIds: ["post-25", "post-26", "post-28", "post-30", "post-40", "post-41"],
  },
  {
    id: "tag-20",
    slug: "food-drink",
    name: "Food & Drink",
    description: "Culinary experiences, food tours, and gastronomy.",
    postIds: ["post-28", "post-35", "post-39", "post-43"],
  },

  // ── Europe ──────────────────────────────────────────────────────────
  {
    id: "tag-21",
    slug: "portugal",
    name: "Portugal",
    description: "Articles about Portugal's wine, cities, and coastal beauty.",
    postIds: ["post-35", "post-39", "post-40"],
  },
  {
    id: "tag-22",
    slug: "italy",
    name: "Italy",
    description: "Articles about Italy's food, art, and landscapes.",
    postIds: ["post-36", "post-39", "post-43"],
  },
  {
    id: "tag-23",
    slug: "greece",
    name: "Greece",
    description: "Articles about Greek islands, history, and cuisine.",
    postIds: ["post-37", "post-39", "post-41"],
  },
  {
    id: "tag-24",
    slug: "iceland",
    name: "Iceland",
    description: "Articles about Iceland's aurora, hiking, and volcanic landscapes.",
    postIds: ["post-38", "post-42"],
  },
  {
    id: "tag-25",
    slug: "hiking",
    name: "Hiking",
    description: "Hiking trails, trekking routes, and walking holidays.",
    postIds: ["post-36", "post-42"],
  },
  {
    id: "tag-26",
    slug: "adventure",
    name: "Adventure",
    description: "Active travel, outdoor experiences, and adventure sports.",
    postIds: ["post-9", "post-16", "post-18", "post-29", "post-42"],
  },
  {
    id: "tag-27",
    slug: "wine",
    name: "Wine",
    description: "Wine regions, tastings, and vineyard experiences.",
    postIds: ["post-35", "post-43"],
  },
  {
    id: "tag-28",
    slug: "train-travel",
    name: "Train Travel",
    description: "Rail journeys, slow travel by train, and scenic routes.",
    postIds: ["post-27", "post-44"],
  },
  {
    id: "tag-29",
    slug: "itinerary-planning",
    name: "Itinerary Planning",
    description: "Guides for designing multi-destination trip itineraries.",
    postIds: ["post-34", "post-37", "post-44"],
  },
  {
    id: "tag-30",
    slug: "sustainability",
    name: "Sustainability",
    description: "Sustainable tourism practices and eco-friendly travel.",
    postIds: ["post-6", "post-31", "post-44"],
  },
];

/**
 * Get blog tag by slug.
 */
export function getBlogTag(slug: string): BlogTag | undefined {
  return BLOG_TAGS.find(t => t.slug === slug);
}

/**
 * Get blog tag by ID.
 */
export function getBlogTagById(id: string): BlogTag | undefined {
  return BLOG_TAGS.find(t => t.id === id);
}
