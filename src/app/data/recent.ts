/**
 * Recent Content Aggregator
 *
 * Aggregates the most recent items across all content types.
 * Useful for homepage "recent" sections, sidebars, and discovery panels.
 *
 * @module recent
 * @category data
 */

import { TOURS } from "./tours/data";
import { BLOG_POSTS } from "./blog/posts";
import { SPECIALS } from "./specials/data";
import { REVIEWS } from "./reviews/data";
import { ACCOMMODATION } from "./accommodation/properties";
import { DESTINATIONS } from "./destinations";
import type { Tour, BlogPost, Special, Review, Accommodation, Destination } from "./types";

/* ── Type Definitions ──────────────────────────────────────────── */

export interface RecentItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  type: "tour" | "post" | "special" | "review" | "accommodation" | "destination";
  href: string;
}

/* ── Helper: Convert content items to RecentItem ─────────────── */

function tourToRecent(t: Tour): RecentItem {
  return {
    id: t.id,
    slug: t.slug,
    title: t.title,
    excerpt: t.excerpt,
    featuredImage: t.featuredImage,
    type: "tour",
    href: `/tours/${t.slug}`,
  };
}

function postToRecent(p: BlogPost): RecentItem {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    featuredImage: p.featuredImage,
    type: "post",
    href: `/blog/${p.slug}`,
  };
}

function specialToRecent(s: Special): RecentItem {
  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    excerpt: s.description || s.title,
    featuredImage: s.featuredImage || "",
    type: "special",
    href: `/specials/${s.slug}`,
  };
}

function reviewToRecent(r: Review): RecentItem {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    featuredImage: r.featuredImage || "",
    type: "review",
    href: `/reviews/${r.slug}`,
  };
}

function accommodationToRecent(a: Accommodation): RecentItem {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    featuredImage: a.featuredImage,
    type: "accommodation",
    href: `/accommodation/${a.slug}`,
  };
}

function destinationToRecent(d: Destination): RecentItem {
  return {
    id: d.id,
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt,
    featuredImage: d.featuredImage,
    type: "destination",
    href: `/destinations/${d.slug}`,
  };
}

/* ── Recent Content Functions ────────────────────────────────── */

/**
 * Get the most recent items from a single content type.
 */
export function getRecentTours(count = 6): RecentItem[] {
  return TOURS.slice(0, count).map(tourToRecent);
}

export function getRecentPosts(count = 6): RecentItem[] {
  return BLOG_POSTS.slice(0, count).map(postToRecent);
}

export function getRecentSpecials(count = 6): RecentItem[] {
  return SPECIALS.slice(0, count).map(specialToRecent);
}

export function getRecentReviews(count = 6): RecentItem[] {
  return REVIEWS.slice(0, count).map(reviewToRecent);
}

export function getRecentAccommodation(count = 6): RecentItem[] {
  return ACCOMMODATION.slice(0, count).map(accommodationToRecent);
}

export function getRecentDestinations(count = 6): RecentItem[] {
  return DESTINATIONS.filter(d => d.type === "country").slice(0, count).map(destinationToRecent);
}

/**
 * Get the most recent items aggregated across ALL content types.
 * Interleaves items from different types for a diverse feed.
 *
 * @param count - Total number of items to return (default 12)
 * @returns Array of RecentItem from mixed content types
 */
export function getRecentContent(count = 12): RecentItem[] {
  const perType = Math.ceil(count / 4);

  const recent = [
    ...getRecentTours(perType),
    ...getRecentPosts(perType),
    ...getRecentSpecials(Math.ceil(perType / 2)),
    ...getRecentReviews(Math.ceil(perType / 2)),
  ];

  // Interleave items from different types for variety
  const byType: Record<string, RecentItem[]> = {};
  for (const item of recent) {
    if (!byType[item.type]) byType[item.type] = [];
    byType[item.type].push(item);
  }

  const interleaved: RecentItem[] = [];
  const types = Object.keys(byType);
  let maxLen = Math.max(...types.map(t => byType[t].length));

  for (let i = 0; i < maxLen; i++) {
    for (const type of types) {
      if (byType[type][i]) {
        interleaved.push(byType[type][i]);
      }
    }
  }

  return interleaved.slice(0, count);
}

/**
 * Get featured content — hand-picked mix for homepage hero or discovery.
 * Takes the first item from each content type.
 */
export function getFeaturedContent(): RecentItem[] {
  return [
    ...getRecentTours(3),
    ...getRecentDestinations(2),
    ...getRecentAccommodation(2),
    ...getRecentPosts(2),
    ...getRecentSpecials(1),
  ];
}

/* ── Pre-computed exports for static usage ─────────────────── */

/** 12 most recent items across all content types */
export const RECENT_CONTENT = getRecentContent(12);

/** 6 most recent tours */
export const RECENT_TOURS = getRecentTours(6);

/** 6 most recent blog posts */
export const RECENT_POSTS = getRecentPosts(6);

/** Featured content mix */
export const FEATURED_CONTENT = getFeaturedContent();
