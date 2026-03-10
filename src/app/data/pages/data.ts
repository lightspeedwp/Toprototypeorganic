import type { Page } from "../types";

/**
 * Standard WordPress pages (About, Contact, FAQ, etc.).
 */
export const PAGES: Page[] = [
  {
    id: "page-1",
    slug: "about",
    title: "About Us",
    excerpt: "Discover our passion for authentic African travel experiences",
    content: "At LightSpeed Tours, we believe that travel has the power to transform lives. For over 15 years, we've been crafting exceptional safari experiences across Southern and East Africa. Our mission is simple: to create authentic, responsible journeys that connect you with Africa's incredible wildlife, landscapes, and cultures while supporting conservation and local communities.",
    template: "about",
  },
  {
    id: "page-2",
    slug: "contact",
    title: "Contact Us",
    excerpt: "Get in touch with our safari specialists",
    content: "Ready to start planning your African adventure? Our experienced team is here to help you create the perfect itinerary. Whether you have questions about specific destinations, need advice on the best time to travel, or want to discuss a custom tour, we're just a phone call or email away.",
    template: "contact",
  },
  {
    id: "page-3",
    slug: "faq",
    title: "Frequently Asked Questions",
    excerpt: "Answers to common questions about African safaris",
    content: "Planning a safari raises many questions. We've compiled answers to the most common inquiries to help you prepare for your African adventure. If you don't find the answer you're looking for, please don't hesitate to contact our team.",
    template: "faq",
  },
];

/**
 * Get page by slug.
 */
export function getPage(slug: string): Page | undefined {
  return PAGES.find(p => p.slug === slug);
}
