import type { Brand } from "../types";

/**
 * Brands (Taxonomy)
 * Represents accommodation brands/chains.
 */
export const BRANDS: Brand[] = [
  {
    id: "brand-1",
    slug: "relais-chateaux",
    name: "Relais & Chateaux",
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
    accommodationIds: ["acc-2", "acc-7", "acc-8", "acc-21", "acc-22", "acc-24"],
  },
  {
    id: "brand-4",
    slug: "andbeyond",
    name: "andBeyond",
    description:
      "Award-winning sustainable luxury safari company operating lodges across Africa and beyond, pioneering the Care of the Land, Wildlife, and People philosophy since 1991",
    logo: "https://www.andbeyond.com/wp-content/themes/flavsuspended/dist/images/logo.svg",
    accommodationIds: [
      "acc-5",
      "acc-15",
      "acc-16",
      "acc-17",
      "acc-18",
      "acc-19",
      "acc-23",
    ],
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
    accommodationIds: ["acc-6", "acc-9", "acc-20"],
  },
  {
    id: "brand-7",
    slug: "londolozi",
    name: "Londolozi Private Game Reserve",
    description:
      "Pioneering family-owned game reserve in the Sabi Sand, South Africa, renowned for its legendary leopard sightings, five distinct camp experiences, and a 100-year conservation legacy as the birthplace of ecotourism in South Africa",
    logo: "https://www.londolozi.com/images/logo.svg",
    accommodationIds: [
      "acc-10",
      "acc-11",
      "acc-12",
      "acc-13",
      "acc-14",
    ],
  },
];

/**
 * Get brand by slug.
 */
export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
