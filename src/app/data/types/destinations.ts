/**
 * Destination domain TypeScript interfaces for the LightSpeed Tour Operator plugin.
 *
 * Destinations represent travel locations that can have parent-child
 * relationships (e.g., Iceland > Reykjavik).
 *
 * @module destination-types
 * @category data/types
 * @wordpressPostType destination
 */

/**
 * Destination custom post type (hierarchical).
 * 
 * @interface Destination
 */
export interface Destination {
  /**
   * Unique destination identifier.
   * Maps to WordPress post ID.
   */
  id: string;

  /**
   * URL-friendly destination identifier.
   * Maps to WordPress post slug.
   * @example "south-africa" | "cape-town"
   */
  slug: string;

  /**
   * Destination name.
   * Used as H1 on single destination pages.
   * @example "South Africa" | "Cape Town"
   */
  title: string;

  /**
   * Brief destination description (1-2 sentences).
   * Used on archive/card views.
   */
  excerpt: string;

  /**
   * Full destination description (HTML allowed).
   * Used on single destination pages.
   */
  content: string;

  /**
   * Featured image URL for the destination.
   * Should be at least 1200x800px.
   */
  featuredImage: string;

  /**
   * Parent destination ID (for hierarchical destinations).
   * References another Destination.id value.
   * @example "south-africa" (for Cape Town)
   */
  parentId?: string;

  /**
   * Continent taxonomy term ID.
   * References Continent.id value.
   * @example "africa"
   */
  continentId: string;

  /**
   * Travel Style taxonomy term IDs.
   * References TravelStyle.id values.
   */
  travelStyles: string[];

  /**
   * Related Tour post IDs.
   * Tours that visit this destination.
   * References Tour.id values.
   */
  tourIds: string[];

  /**
   * Related Accommodation post IDs.
   * Accommodation located in this destination.
   * References Accommodation.id values.
   */
  accommodationIds: string[];

  /**
   * Best time to visit.
   * @example "November - March (Summer)"
   */
  bestTime: string;

  /**
   * Climate description.
   * @example "Mediterranean climate with hot, dry summers"
   */
  climate: string;

  /**
   * Local currency.
   * @example "South African Rand (ZAR)"
   */
  currency: string;

  /**
   * Primary language(s) spoken.
   * @example "Afrikaans, English, Xhosa"
   */
  language: string;

  /**
   * Timezone.
   * @example "GMT+2"
   */
  timezone: string;

  /**
   * Destination highlights (key attractions).
   */
  highlights: string[];

  /**
   * Geographic coordinates for map display.
   * @example { lat: -33.9249, lng: 18.4241 }
   */
  coordinates?: {
    lat: number;
    lng: number;
  };

  /**
   * Destination type for smart routing.
   * Determines which template to use for rendering.
   * @example "country" | "region" | "city" | "park"
   */
  type?: 'country' | 'region' | 'city' | 'park';

  /**
   * Country information sections (for country-type destinations).
   * Contains essential travel information for the country.
   */
  countryInfo?: {
    banking: string;
    climate: string;
    cuisine: string;
    electricity: string;
    dress: string;
    health: string;
    safety: string;
    transport: string;
    visa: string;
    currency: string;
  };

  /**
   * Video URLs for destination videos.
   * Can be YouTube, Vimeo, or direct video URLs.
   */
  videos?: Array<{
    id: string;
    title: string;
    url: string;
    thumbnail?: string;
  }>;

  /**
   * Gallery images for photo gallery section.
   */
  gallery?: string[];

  /**
   * Experiences available at this destination.
   */
  experiences?: string[];

  /**
   * Related Special post IDs.
   * References Special.id values.
   */
  relatedSpecialIds?: string[];

  /**
   * Related Blog post IDs.
   * References BlogPost.id values.
   */
  relatedBlogIds?: string[];

  /**
   * Related Review post IDs.
   * References Review.id values.
   */
  relatedReviewIds?: string[];

  /**
   * Dedicated consultant Team member ID.
   * References TeamMember.id value.
   */
  dedicatedConsultantId?: string;
}

/**
 * Continent taxonomy term.
 * 
 * Top-level geographic categorization for destinations.
 * 
 * @interface Continent
 * @wordpressTaxonomy continent
 */
export interface Continent {
  /**
   * Unique continent identifier.
   */
  id: string;

  /**
   * URL-friendly continent identifier.
   * @example "africa"
   */
  slug: string;

  /**
   * Continent name.
   * @example "Africa"
   */
  name: string;

  /**
   * Continent description.
   */
  description: string;

  /**
   * Related Destination post IDs.
   */
  destinationIds: string[];
}
