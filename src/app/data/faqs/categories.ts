import type { FAQCategory } from "../types";

/**
 * FAQ Categories
 */
export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "general",
    slug: "general",
    name: "General",
    description: "General questions about LightSpeed Tours and our services.",
    icon: "HelpCircle",
    faqIds: ["faq-1", "faq-2", "faq-3", "faq-4"],
    order: 1,
  },
  {
    id: "booking",
    slug: "booking",
    name: "Booking & Reservations",
    description: "Questions about booking tours, payments, and reservations.",
    icon: "Calendar",
    faqIds: ["faq-5", "faq-6", "faq-7", "faq-8"],
    order: 2,
  },
  {
    id: "tours",
    slug: "tours",
    name: "Tours & Itineraries",
    description: "Questions about our tours, itineraries, and travel experiences.",
    icon: "Map",
    faqIds: ["faq-9", "faq-10", "faq-11", "faq-12"],
    order: 3,
  },
  {
    id: "destinations",
    slug: "destinations",
    name: "Destinations",
    description: "Questions about travel destinations, visas, and local information.",
    icon: "Globe",
    faqIds: ["faq-13", "faq-14", "faq-15", "faq-16"],
    order: 4,
  },
  {
    id: "accommodation",
    slug: "accommodation",
    name: "Accommodation",
    description: "Questions about hotels, lodges, and accommodation options.",
    icon: "Hotel",
    faqIds: ["faq-17", "faq-18", "faq-19"],
    order: 5,
  },
  {
    id: "payment",
    slug: "payment",
    name: "Payment & Pricing",
    description: "Questions about pricing, payment methods, and refunds.",
    icon: "CreditCard",
    faqIds: ["faq-20", "faq-21", "faq-22"],
    order: 6,
  },
  {
    id: "travel",
    slug: "travel",
    name: "Travel Preparation",
    description: "Questions about packing, travel documents, and preparation.",
    icon: "Luggage",
    faqIds: ["faq-23", "faq-24", "faq-25"],
    order: 7,
  },
  {
    id: "safety",
    slug: "safety",
    name: "Safety & Insurance",
    description: "Questions about travel safety, insurance, and health requirements.",
    icon: "Shield",
    faqIds: ["faq-26", "faq-27", "faq-28"],
    order: 8,
  },
];

/**
 * Get FAQ category by slug.
 */
export function getFAQCategory(slug: string): FAQCategory | undefined {
  return FAQ_CATEGORIES.find(cat => cat.slug === slug);
}
