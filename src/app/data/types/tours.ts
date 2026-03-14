/**
 * Tour domain TypeScript interfaces for the LightSpeed Tour Operator plugin.
 *
 * Tours are the primary content type representing travel packages.
 * Each tour includes destination references, travel style taxonomy terms,
 * and detailed itinerary information.
 *
 * @module tour-types
 * @category data/types
 * @wordpressPostType tour
 */

/**
 * Tour custom post type.
 * 
 * @interface Tour
 */
export interface Tour {
  /**
   * Unique tour identifier.
   * Maps to WordPress post ID.
   */
  id: string;

  /**
   * URL-friendly tour identifier.
   * Maps to WordPress post slug.
   * @example "iceland-explorer"
   */
  slug: string;

  /**
   * Tour title/name.
   * Used as H1 on single tour pages.
   * @example "Iceland Explorer: 7-Day Adventure"
   */
  title: string;

  /**
   * Brief tour description (1-2 sentences).
   * Used on archive/card views.
   * @example "Discover Iceland's stunning landscapes, waterfalls, and geothermal wonders on this unforgettable 7-day journey."
   */
  excerpt: string;

  /**
   * Full tour description and itinerary (HTML allowed).
   * Used on single tour pages in editorial content sections.
   */
  content: string;

  /**
   * Featured image URL for the tour.
   * Should be at least 1200x800px.
   * @example "https://images.unsplash.com/photo-iceland-landscape"
   */
  featuredImage: string;

  /**
   * Travel Style taxonomy term IDs.
   * References TravelStyle.id values.
   * @example ["adventure", "family", "wildlife"]
   */
  travelStyles: string[];

  /**
   * Related Destination post IDs.
   * References Destination.id values.
   * @example ["iceland", "reykjavik"]
   */
  destinations: string[];

  /**
   * Tour duration.
   * @example "7 days / 6 nights"
   */
  duration: string;

  /**
   * Tour price (from/starting price).
   * @example "From $2,999 per person"
   */
  price: string;

  /**
   * Maximum group size.
   * @example "12 travelers"
   */
  groupSize: string;

  /**
   * Difficulty level.
   * @example "Moderate" | "Easy" | "Challenging"
   */
  difficulty: string;

  /**
   * Best time to travel.
   * @example "June - August"
   */
  bestTime: string;

  /**
   * Related Accommodation post IDs.
   * References Accommodation.id values.
   */
  accommodation: string[];

  /**
   * Tour highlights (key features).
   * @example ["Northern Lights viewing", "Glacier hiking", "Hot spring bathing"]
   */
  highlights: string[];

  /**
   * What's included in the tour price.
   * @example ["Accommodation", "Daily breakfast", "Airport transfers"]
   */
  included: string[];

  /**
   * What's excluded from the tour price.
   * @example ["International flights", "Travel insurance", "Personal expenses"]
   */
  excluded: string[];

  /**
   * Whether this tour is a special offer.
   * Used to show countdown timer.
   */
  isSpecialOffer?: boolean;

  /**
   * Special offer end date (ISO 8601 format).
   * Only used if isSpecialOffer is true.
   * @example "2024-12-31T23:59:59Z"
   */
  specialOfferEndDate?: string;

  /**
   * Map URL or embed code for tour route.
   * Can be Google Maps embed URL or similar.
   */
  mapUrl?: string;

  /**
   * Name of the destination (for display).
   * @example "Iceland"
   */
  destination?: string;

  /**
   * Traveller Type taxonomy term IDs.
   * References TravellerType.id values.
   * @example ["ttype-1", "ttype-2"]
   */
  travellerTypes?: string[];
}

/**
 * Travel Style taxonomy term.
 * 
 * Travel Styles categorize tours, destinations, and accommodation
 * by the type of travel experience (e.g., Adventure, Luxury, Family).
 * 
 * @interface TravelStyle
 * @wordpressTaxonomy travel-style
 */
export interface TravelStyle {
  /**
   * Unique travel style identifier.
   * Maps to WordPress term ID.
   */
  id: string;

  /**
   * URL-friendly travel style identifier.
   * Maps to WordPress term slug.
   * @example "adventure"
   */
  slug: string;

  /**
   * Travel style name.
   * @example "Adventure"
   */
  name: string;

  /**
   * Travel style description.
   * Used on taxonomy archive pages.
   */
  description: string;

  /**
   * Related Tour post IDs.
   * Tours tagged with this travel style.
   */
  tourIds: string[];

  /**
   * Related Destination post IDs.
   * Destinations tagged with this travel style.
   */
  destinationIds: string[];

  /**
   * Related Accommodation post IDs.
   * Accommodation tagged with this travel style.
   */
  accommodationIds: string[];
}