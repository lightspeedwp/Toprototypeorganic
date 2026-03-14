/**
 * Shared/Common TypeScript interfaces for the LightSpeed Tour Operator plugin.
 *
 * This file contains utility interfaces used across multiple domains,
 * such as FAQs, CTAs, Hero content, and specialized content like
 * Insurance and Packing guides.
 *
 * @module common-types
 * @category data/types
 */

/**
 * FAQ Item.
 * Individual FAQ question and answer.
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

/**
 * Page FAQs collection.
 */
export interface PageFAQs {
  pageId: string;
  pageType: string;
  items: FAQItem[];
}

/**
 * CTA (Call-to-Action) content.
 */
export interface CTAContent {
  id: string;
  context: string;
  title: string;
  description: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  secondaryButtonAction?: string;
  modalTitle?: string;
  modalDescription?: string;
}

/**
 * Hero Content.
 * Centralized hero section data for all page templates.
 */
export interface HeroContent {
  id: string;
  context: string;
  title: string;
  description: string;
  image: string;
  /** Optional badge/chip displayed above the title. Icon is a Phosphor icon name. */
  badge?: { icon: string; label: string };
  primaryCTALabel?: string;
  primaryCTAHref?: string;
  secondaryCTALabel?: string;
  secondaryCTAHref?: string;
  height?: "small" | "medium" | "large";
  overlay?: "light" | "medium" | "dark";
  /** Whether to show the scroll-down arrow at the bottom of the hero. */
  showScrollIndicator?: boolean;
}

/**
 * Page Section FAQs.
 * Groups FAQ items for display within page sections.
 */
export interface PageSectionFAQs {
  id: string;
  context: string;
  sectionTitle: string;
  sectionDescription?: string;
  items: FAQItem[];
}

/**
 * Homepage Section Content.
 */
export interface HomepageSectionContent {
  id: string;
  sectionKey: string;
  eyebrow?: string;
  title: string;
  description: string;
  viewAllLabel?: string;
  viewAllHref?: string;
}

/**
 * Homepage Feature Item.
 */
export interface HomepageFeature {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

/**
 * Homepage Statistic Item.
 */
export interface HomepageStatistic {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  iconName: string;
}

/**
 * Homepage Content Bundle.
 */
export interface HomepageContent {
  sections: HomepageSectionContent[];
  features: HomepageFeature[];
  statistics: HomepageStatistic[];
  newsletter: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
    primaryButtonLabel: string;
    primaryButtonHref: string;
    secondaryButtonLabel: string;
    secondaryButtonHref: string;
  };
}

/**
 * Insurance Provider.
 */
export interface InsuranceProvider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  startingPrice: string;
  features: string[];
  url: string;
  recommended: boolean;
}

/**
 * Insurance Plan.
 */
export interface InsurancePlan {
  id: string;
  name: string;
  price: string;
  coverage: {
    medical: string;
    evacuation: string;
    cancellation: string;
    baggage: string;
  };
  features: string[];
  recommended: boolean;
}

/**
 * Insurance Scenario.
 */
export interface InsuranceScenario {
  id: string;
  title: string;
  description: string;
  cost: string;
  covered: boolean;
  details: string;
}

/**
 * Insurance Requirement.
 */
export interface InsuranceRequirement {
  id: string;
  destination: string;
  mandatory: boolean;
  description: string;
  recommendedCoverage: string[];
}

/**
 * Packing List.
 */
export interface PackingList {
  id: string;
  title: string;
  description: string;
  category: "general" | "photography" | "health" | "seasonal";
  items: string[];
  featured: boolean;
  downloads: number;
}

/**
 * Packing Category.
 */
export interface PackingCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  listIds: string[];
}

/**
 * Safari Essential Item.
 */
export interface SafariEssential {
  id: string;
  name: string;
  category: string;
  priority: "must-have" | "recommended" | "optional";
  notes: string;
}

/**
 * Seasonal Packing Guide.
 */
export interface SeasonalGuide {
  id: string;
  season: string;
  months: string;
  temperature: string;
  clothing: string[];
  considerations: string[];
}

/**
 * Photography Gear Item.
 */
export interface PhotographyGear {
  id: string;
  name: string;
  category: "camera" | "lens" | "accessory";
  priority: "essential" | "recommended" | "optional";
  notes: string;
}

/**
 * Health & Safety Item.
 */
export interface HealthSafetyItem {
  id: string;
  name: string;
  category: "medication" | "vaccination" | "preparation";
  required: boolean;
  notes: string;
}

/**
 * Enhanced Special (extends base Special).
 * 
 * Adds category taxonomy, related content, and rich schema fields.
 */
export interface EnhancedSpecial {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  discount: string;
  validFrom: string;
  validTo: string;
  travelStyles: string[];
  terms: string;
  categories: string[];
  tourIds?: string[];
  destinationIds?: string[];
  accommodationIds?: string[];
  originalPrice?: string;
  discountedPrice?: string;
  discountType?: "percentage" | "fixed" | "value-add";
  bookingDeadline?: string;
  travelDateStart?: string;
  travelDateEnd?: string;
  availableSpots?: number;
  bookedSpots?: number;
  isFlashSale?: boolean;
  promoCode?: string;
}

/**
 * Enhanced Team Member (extends base TeamMember).
 * 
 * Adds role taxonomy, social links, and rich schema fields.
 */
export interface EnhancedTeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  excerpt: string;
  featuredImage: string;
  email: string;
  phone: string;
  specialties: string[];
  roles: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  yearsExperience?: number;
  languages?: string[];
  destinationIds?: string[];
  toursLed?: number;
  certifications?: string[];
  travelQuote?: string;
  dateJoined?: string;
  featured?: boolean;
}

/**
 * Review Category taxonomy term.
 */
export interface ReviewCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  reviewIds: string[];
}

/**
 * Special Category taxonomy term.
 */
export interface SpecialCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  specialIds: string[];
}

/**
 * Team Role taxonomy term.
 */
export interface TeamRole {
  id: string;
  slug: string;
  name: string;
  description: string;
  memberIds: string[];
}

/**
 * FAQ Post Type (Enhanced).
 */
export interface FAQ {
  id: string;
  slug: string;
  question: string;
  answer: string;
  excerpt: string;
  categories: string[];
  relatedContentType?: "tour" | "destination" | "accommodation" | "booking" | "general" | "payment" | "travel" | "safety" | "wildlife" | "asia" | "europe" | "sustainability" | "families" | "photography";
  relatedContentIds?: string[];
  order: number;
  featured: boolean;
  datePublished: string;
  dateModified: string;
  helpfulCount?: number;
  viewCount?: number;
}

/**
 * FAQ Category taxonomy term.
 */
export interface FAQCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: string;
  faqIds: string[];
  order: number;
}

/**
 * Page custom post type.
 * 
 * Standard WordPress pages (About, Contact, FAQ, etc.).
 * 
 * @interface Page
 * @wordpressPostType page
 */
export interface Page {
  /**
   * Unique page identifier.
   */
  id: string;

  /**
   * URL-friendly page identifier.
   * @example "about"
   */
  slug: string;

  /**
   * Page title.
   * @example "About Us"
   */
  title: string;

  /**
   * Brief page description.
   */
  excerpt: string;

  /**
   * Full page content (HTML allowed).
   */
  content: string;

  /**
   * Page template to use.
   */
  template: 'default' | 'about' | 'contact' | 'faq';

  /**
   * Optional featured image URL.
   */
  featuredImage?: string;
}