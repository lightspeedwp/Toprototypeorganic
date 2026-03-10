/**
 * Common Data
 * 
 * @deprecated This file is being modularized. 
 * Please import from specific domain files instead:
 * - Taxonomies: import { ... } from "./taxonomies"
 * - Pages: import { ... } from "./pages"
 * 
 * @module common
 * @category data
 */

export * from "./taxonomies";
export * from "./pages";

import { CONTINENTS } from "./destinations/continents";
import type { Continent } from "./types";

/**
 * Get continent by slug.
 */
export function getContinent(slug: string): Continent | undefined {
  return CONTINENTS.find(c => c.slug === slug);
}
