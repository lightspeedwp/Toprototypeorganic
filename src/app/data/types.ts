/**
 * TypeScript interfaces for WordPress content types and taxonomies.
 * 
 * These interfaces define the structure of all content types used in the
 * LightSpeed Tour Operator plugin. They map directly to WordPress custom
 * post types and taxonomies, ensuring type safety across the prototype.
 * 
 * All mock data in mock.ts implements these interfaces.
 * 
 * @module types
 * @category data
 * @see /guidelines/ARCHITECTURE.md
 * @see /src/app/data/mock.ts
 */

import {
  FAQItem,
  PageFAQs,
  CTAContent,
  HeroContent,
  PageSectionFAQs,
  HomepageSectionContent,
  HomepageFeature,
  HomepageStatistic,
  HomepageContent,
  InsuranceProvider,
  InsurancePlan,
  InsuranceScenario,
  InsuranceRequirement,
  PackingList,
  PackingCategory,
  SafariEssential,
  SeasonalGuide,
  PhotographyGear,
  HealthSafetyItem,
  FAQ,
  FAQCategory,
  ReviewCategory,
  SpecialCategory,
  TeamRole,
  EnhancedSpecial,
  EnhancedTeamMember,
  Page
} from "./types/common";

export type {
  FAQItem,
  PageFAQs,
  CTAContent,
  HeroContent,
  PageSectionFAQs,
  HomepageSectionContent,
  HomepageFeature,
  HomepageStatistic,
  HomepageContent,
  InsuranceProvider,
  InsurancePlan,
  InsuranceScenario,
  InsuranceRequirement,
  PackingList,
  PackingCategory,
  SafariEssential,
  SeasonalGuide,
  PhotographyGear,
  HealthSafetyItem,
  FAQ,
  FAQCategory,
  ReviewCategory,
  SpecialCategory,
  TeamRole,
  EnhancedSpecial,
  EnhancedTeamMember,
  Page
};

export * from "./types/index";
