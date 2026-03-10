import type { SpecialCategory } from "../types";

export const SPECIAL_CATEGORIES: SpecialCategory[] = [
  {
    id: "cat-1",
    slug: "honeymoon",
    name: "Honeymoon",
    description: "Exclusive offers for newlyweds",
  },
  {
    id: "cat-2",
    slug: "family",
    name: "Family",
    description: "Deals for family adventures",
  },
  {
    id: "cat-3",
    slug: "last-minute",
    name: "Last Minute",
    description: "Limited time offers for upcoming travel",
  },
  {
    id: "cat-4",
    slug: "early-bird",
    name: "Early Bird",
    description: "Book early and save",
  },
  {
    id: "cat-5",
    slug: "green-season",
    name: "Green Season",
    description: "Special rates for travel during the green season",
  },
];

/**
 * Get special category by slug
 */
export function getSpecialCategory(slug: string): SpecialCategory | undefined {
  return SPECIAL_CATEGORIES.find(c => c.slug === slug);
}
