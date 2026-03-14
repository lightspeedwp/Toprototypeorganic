import type { FAQCategory } from "../types";

/**
 * FAQ Categories
 *
 * 14 categories covering general, booking, tours, destinations, accommodation,
 * payment, travel, safety, wildlife, Asia, Europe, sustainability, families,
 * and photography.
 *
 * @module faq-categories
 * @category data/taxonomies
 * @wordpressTaxonomy faq_category
 */
export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "general",
    slug: "general",
    name: "General",
    description: "General questions about LightSpeed Tours and our services.",
    icon: "HelpCircle",
    faqIds: ["faq-1", "faq-2", "faq-3", "faq-4", "faq-29", "faq-30", "faq-31"],
    order: 1,
  },
  {
    id: "booking",
    slug: "booking",
    name: "Booking & Reservations",
    description: "Questions about booking tours, payments, and reservations.",
    icon: "Calendar",
    faqIds: ["faq-5", "faq-6", "faq-7", "faq-8", "faq-32", "faq-33", "faq-34", "faq-35"],
    order: 2,
  },
  {
    id: "tours",
    slug: "tours",
    name: "Tours & Itineraries",
    description: "Questions about our tours, itineraries, and travel experiences.",
    icon: "Map",
    faqIds: ["faq-9", "faq-10", "faq-11", "faq-12", "faq-36", "faq-37", "faq-38", "faq-39"],
    order: 3,
  },
  {
    id: "destinations",
    slug: "destinations",
    name: "Destinations",
    description: "Questions about travel destinations, visas, and local information.",
    icon: "Globe",
    faqIds: ["faq-13", "faq-14", "faq-15", "faq-16", "faq-40", "faq-41", "faq-42"],
    order: 4,
  },
  {
    id: "accommodation",
    slug: "accommodation",
    name: "Accommodation",
    description: "Questions about hotels, lodges, and accommodation options.",
    icon: "Hotel",
    faqIds: ["faq-17", "faq-18", "faq-19", "faq-43", "faq-44", "faq-45"],
    order: 5,
  },
  {
    id: "payment",
    slug: "payment",
    name: "Payment & Pricing",
    description: "Questions about pricing, payment methods, and refunds.",
    icon: "CreditCard",
    faqIds: ["faq-20", "faq-21", "faq-22", "faq-46", "faq-47"],
    order: 6,
  },
  {
    id: "travel",
    slug: "travel",
    name: "Travel Preparation",
    description: "Questions about packing, travel documents, and preparation.",
    icon: "Luggage",
    faqIds: ["faq-23", "faq-24", "faq-25", "faq-48", "faq-49", "faq-50"],
    order: 7,
  },
  {
    id: "safety",
    slug: "safety",
    name: "Safety & Insurance",
    description: "Questions about travel safety, insurance, and health requirements.",
    icon: "Shield",
    faqIds: ["faq-26", "faq-27", "faq-28", "faq-51", "faq-52", "faq-53"],
    order: 8,
  },
  {
    id: "wildlife",
    slug: "wildlife",
    name: "Wildlife & Safari",
    description: "Questions about wildlife viewing, safari activities, and animal encounters.",
    icon: "Binoculars",
    faqIds: ["faq-54", "faq-55", "faq-56", "faq-57", "faq-58", "faq-59", "faq-60", "faq-61"],
    order: 9,
  },
  {
    id: "asia",
    slug: "asia",
    name: "Asia Travel",
    description: "Questions specific to travelling in Thailand, Japan, Sri Lanka, Vietnam, Indonesia, and Cambodia.",
    icon: "Palmtree",
    faqIds: ["faq-62", "faq-63", "faq-64", "faq-65", "faq-66", "faq-67", "faq-68", "faq-69"],
    order: 10,
  },
  {
    id: "europe",
    slug: "europe",
    name: "Europe Travel",
    description: "Questions specific to travelling in Portugal, Italy, Greece, and Iceland.",
    icon: "Landmark",
    faqIds: ["faq-70", "faq-71", "faq-72", "faq-73", "faq-74", "faq-75", "faq-76", "faq-77"],
    order: 11,
  },
  {
    id: "sustainability",
    slug: "sustainability",
    name: "Sustainability & Responsible Travel",
    description: "Questions about our environmental and social impact commitments.",
    icon: "Leaf",
    faqIds: ["faq-78", "faq-79", "faq-80", "faq-81", "faq-82"],
    order: 12,
  },
  {
    id: "families",
    slug: "families",
    name: "Family Travel",
    description: "Questions about travelling with children and teenagers.",
    icon: "Users",
    faqIds: ["faq-83", "faq-84", "faq-85", "faq-86", "faq-87"],
    order: 13,
  },
  {
    id: "photography",
    slug: "photography",
    name: "Photography",
    description: "Questions about travel photography, equipment, and dedicated photography tours.",
    icon: "Camera",
    faqIds: ["faq-88", "faq-89", "faq-90", "faq-91"],
    order: 14,
  },
];

/**
 * Get FAQ category by slug.
 */
export function getFAQCategory(slug: string): FAQCategory | undefined {
  return FAQ_CATEGORIES.find(cat => cat.slug === slug);
}

/**
 * Get FAQ category by ID.
 */
export function getFAQCategoryById(id: string): FAQCategory | undefined {
  return FAQ_CATEGORIES.find(cat => cat.id === id);
}
