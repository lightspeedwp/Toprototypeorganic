/**
 * Data Index
 * 
 * Central export point for all mock data modules.
 * This simplifies imports throughout the application.
 * 
 * @module data
 */

export * from "./types";
export * from "./tours";
export * from "./destinations";
export * from "./accommodation";
export * from "./blog";
export * from "./common";
export * from "./insurance";
export * from "./packing";
export * from "./site-content";
export * from "./homepage";
export * from "./cta";
export * from "./faqs";
export * from "./specials";
export * from "./team";
export * from "./reviews";
export * from "./generators";
export * from "./mockExpanded";

// Optional: Aggregated export if needed by specific components
import { TOURS } from "./tours";
import { DESTINATIONS } from "./destinations";
import { ACCOMMODATION } from "./accommodation";
import { BLOG_POSTS } from "./blog";
import { SPECIALS } from "./specials";
import { TEAM_MEMBERS } from "./team";
import { REVIEWS } from "./reviews";
import { PAGES } from "./common";

import {
  ALL_TOURS,
  ALL_DESTINATIONS,
  ALL_ACCOMMODATION,
  ALL_BLOG_POSTS,
  ALL_SPECIALS,
  ALL_TEAM,
  ALL_REVIEWS,
} from "./mockExpanded";

export const ALL_CONTENT = {
  tours: TOURS,
  destinations: DESTINATIONS,
  accommodation: ACCOMMODATION,
  posts: BLOG_POSTS,
  specials: SPECIALS,
  team: TEAM_MEMBERS,
  reviews: REVIEWS,
  pages: PAGES,
};

export const ALL_CONTENT_EXPANDED = {
  tours: ALL_TOURS,
  destinations: ALL_DESTINATIONS,
  accommodation: ALL_ACCOMMODATION,
  posts: ALL_BLOG_POSTS,
  specials: ALL_SPECIALS,
  team: ALL_TEAM,
  reviews: ALL_REVIEWS,
  pages: PAGES, // Pages are not expanded usually
};
