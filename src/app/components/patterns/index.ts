/**
 * Pattern Components - Barrel Export
 * 
 * Centralized exports for all pattern components.
 * Import patterns using: import { PatternName } from '../patterns';
 */

// Existing Patterns
export { Hero } from './Hero';
export { CardGrid } from './CardGrid';
export { CTA } from './CTA';
export { TourCard } from './TourCard';
export { DestinationCard } from './DestinationCard';
export { AccommodationCard } from './AccommodationCard';
export { BlogCard } from './BlogCard';
export { TeamCard } from './TeamCard';

// Phase 2 Patterns - Utility
export { NewsletterSignupPattern } from './NewsletterSignupPattern';
export { SearchFilterPattern } from './SearchFilterPattern';
export { EmptyStatePattern } from './EmptyStatePattern';
export { BreadcrumbsPattern } from './BreadcrumbsPattern';

// Archive Patterns
export { ArchiveResultsSection } from './ArchiveResultsSection';
export { ActiveFilterSummary, searchFilterTag, singleFilterTag, multiFilterTags, buildFilterTags } from './ActiveFilterSummary';
export { CollapsibleFilterPanel } from './CollapsibleFilterPanel';
export type { FilterChipGroup, FilterChipItem } from './CollapsibleFilterPanel';

// Phase 2 Patterns - Tour/Accommodation
export { PricingSectionPattern } from './PricingSectionPattern';
export { InclusionsPattern } from './InclusionsPattern';
export { ReviewsSectionPattern } from './ReviewsSectionPattern';
export { RoomTypesPattern } from './RoomTypesPattern';

// Phase 2 Patterns - Destination
export { MapSectionPattern } from './MapSectionPattern';
export { ClimateInfoPattern } from './ClimateInfoPattern';
export { HighlightsGridPattern } from './HighlightsGridPattern';

// Phase 2 Patterns - Special
export { CountdownPattern } from './CountdownPattern';

// Phase 2 Patterns - Content/Blog
export { StatisticsMetricsPattern } from './StatisticsMetricsPattern';
export { ContactInfoPattern } from './ContactInfoPattern';
export { WhyChooseUsPattern } from './WhyChooseUsPattern';
export { AuthorBioPattern } from './AuthorBioPattern';
export { TableOfContentsPattern } from './TableOfContentsPattern';
export { SitemapGridPattern } from './SitemapGridPattern';