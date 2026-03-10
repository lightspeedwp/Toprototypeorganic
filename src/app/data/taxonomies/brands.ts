import type { Brand } from "../types";

/**
 * Brands (Taxonomy)
 * Represents accommodation brands/chains.
 */
export const BRANDS: Brand[] = [
  {
    id: "brand-1",
    slug: "relais-chateaux",
    name: "Relais & Châteaux",
    description: "Collection of luxury hotels and restaurants worldwide",
    accommodationIds: ["acc-1"],
  },
  {
    id: "brand-2",
    slug: "leading-hotels",
    name: "Leading Hotels of the World",
    description: "Prestigious collection of independent luxury hotels",
    accommodationIds: ["acc-3"],
  },
  {
    id: "brand-3",
    slug: "independent",
    name: "Independent",
    description: "Independently owned and operated properties",
    accommodationIds: ["acc-2", "acc-7", "acc-8"],
  },
  {
    id: "brand-4",
    slug: "andbeyond",
    name: "&Beyond",
    description: "Sustainable luxury safari lodges",
    accommodationIds: ["acc-5"],
  },
  {
    id: "brand-5",
    slug: "singita",
    name: "Singita",
    description: "Conservation-focused luxury lodges",
    accommodationIds: ["acc-4"],
  },
  {
    id: "brand-6",
    slug: "wilderness-safaris",
    name: "Wilderness Safaris",
    description: "Ecotourism company focused on conservation",
    accommodationIds: ["acc-6", "acc-9"],
  },
];

/**
 * Get brand by slug.
 */
export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find(b => b.slug === slug);
}
