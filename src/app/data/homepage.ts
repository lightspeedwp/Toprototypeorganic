/**
 * Homepage Data
 * 
 * Mock data for the homepage sections, features, and statistics.
 * 
 * @module homepage
 * @category data
 */

import type { 
  HomepageSectionContent, 
  HomepageFeature, 
  HomepageStatistic, 
  HomepageContent 
} from "./types";

/**
 * Homepage section header content.
 *
 * Each entry provides the eyebrow, heading, description, and "view all" link
 * for one homepage section. Components look up their section by `sectionKey`.
 *
 * @constant {HomepageSectionContent[]}
 */
export const HOMEPAGE_SECTIONS: HomepageSectionContent[] = [
  {
    id: "hp-section-featured-tours",
    sectionKey: "featured-tours",
    eyebrow: "Featured tours",
    title: "Popular adventures",
    description:
      "Handpicked experiences that showcase the best of what we offer. From thrilling expeditions to cultural immersions.",
    viewAllLabel: "View all tours",
    viewAllHref: "/tours",
  },
  {
    id: "hp-section-destinations",
    sectionKey: "destinations",
    eyebrow: "Destinations",
    title: "Explore the world",
    description:
      "From tropical paradises to alpine adventures, discover destinations that will take your breath away.",
    viewAllLabel: "View all destinations",
    viewAllHref: "/destinations",
  },
  {
    id: "hp-section-why-choose-us",
    sectionKey: "why-choose-us",
    title: "Why travel with us",
    description:
      "We're more than just a tour operator. We're your partners in creating unforgettable experiences.",
  },
  {
    id: "hp-section-statistics",
    sectionKey: "statistics",
    title: "Our impact in numbers",
    description:
      "Join thousands of satisfied travelers who've explored the world with us.",
  },
  {
    id: "hp-section-accommodation",
    sectionKey: "accommodation",
    eyebrow: "Accommodation",
    title: "Handpicked properties",
    description:
      "Stay in carefully selected lodges, hotels, and camps that enhance your travel experience.",
    viewAllLabel: "View all properties",
    viewAllHref: "/accommodation",
  },
  {
    id: "hp-section-team",
    sectionKey: "team",
    eyebrow: "Our team",
    title: "Meet the experts",
    description:
      "Passionate travel professionals dedicated to creating your perfect journey.",
    viewAllLabel: "Meet the full team",
    viewAllHref: "/team",
  },
  {
    id: "hp-section-testimonials",
    sectionKey: "testimonials",
    title: "What travelers say",
    description:
      "Don't just take our word for it. Hear from travelers who've experienced the magic firsthand.",
    viewAllLabel: "Read more reviews",
    viewAllHref: "/reviews",
  },
  {
    id: "hp-section-blog",
    sectionKey: "blog",
    title: "Travel stories & tips",
    description:
      "Get inspired by travel stories, destination guides, and expert tips from our team.",
    viewAllLabel: "Visit our blog",
    viewAllHref: "/blog",
  },
];

/**
 * Homepage "Why Choose Us" features.
 *
 * @constant {HomepageFeature[]}
 */
export const HOMEPAGE_FEATURES: HomepageFeature[] = [
  {
    id: "hp-feature-experience",
    iconName: "TrendingUp",
    title: "20+ years experience",
    description:
      "Two decades of crafting unforgettable journeys and building lasting relationships with travelers worldwide.",
  },
  {
    id: "hp-feature-satisfaction",
    iconName: "Shield",
    title: "100% satisfaction",
    description:
      "We stand behind every trip we organize. If you're not satisfied, we'll make it right.",
  },
  {
    id: "hp-feature-personalized",
    iconName: "Heart",
    title: "Personalized service",
    description:
      "Every traveler is unique. We customize each journey to match your interests, pace, and preferences.",
  },
];

/**
 * Homepage statistics / metrics.
 *
 * @constant {HomepageStatistic[]}
 */
export const HOMEPAGE_STATISTICS: HomepageStatistic[] = [
  {
    id: "hp-stat-travelers",
    value: "10,000",
    suffix: "+",
    label: "Happy travelers",
    iconName: "Users",
  },
  {
    id: "hp-stat-destinations",
    value: "150",
    suffix: "+",
    label: "Destinations",
    iconName: "Globe",
  },
  {
    id: "hp-stat-rating",
    value: "4.9",
    suffix: "/5",
    label: "Average rating",
    iconName: "Award",
  },
  {
    id: "hp-stat-experience",
    value: "20",
    suffix: "+",
    label: "Years experience",
    iconName: "TrendingUp",
  },
];

/**
 * Aggregated homepage content bundle.
 *
 * Single import gives the page template everything it needs.
 *
 * @constant {HomepageContent}
 */
export const HOMEPAGE_CONTENT: HomepageContent = {
  sections: HOMEPAGE_SECTIONS,
  features: HOMEPAGE_FEATURES,
  statistics: HOMEPAGE_STATISTICS,
  newsletter: {
    title: "Stay inspired",
    description:
      "Get travel tips, destination guides, and exclusive deals delivered straight to your inbox.",
  },
  cta: {
    title: "Ready to start your adventure?",
    description:
      "Browse our collection of handpicked tours and find your next journey. From weekend getaways to month-long expeditions, we have something for every traveler.",
    primaryButtonLabel: "Browse all tours",
    primaryButtonHref: "/tours",
    secondaryButtonLabel: "Contact us",
    secondaryButtonHref: "/contact",
  },
};

/**
 * Helper: get a homepage section by key.
 *
 * @param sectionKey - e.g. "featured-tours", "destinations"
 * @returns HomepageSectionContent or undefined
 */
export function getHomepageSection(
  sectionKey: string
): HomepageSectionContent | undefined {
  return HOMEPAGE_SECTIONS.find((s) => s.sectionKey === sectionKey);
}
