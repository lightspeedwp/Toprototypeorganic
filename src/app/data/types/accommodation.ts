/**
 * Accommodation domain TypeScript interfaces for the LightSpeed Tour Operator plugin.
 *
 * Represents hotels, lodges, resorts, and other accommodation options
 * featured in tours or available for booking.
 *
 * @module accommodation-types
 * @category data/types
 * @wordpressPostType accommodation
 */

/**
 * Accommodation custom post type.
 * 
 * @interface Accommodation
 */
export interface Accommodation {
  /**
   * Unique accommodation identifier.
   * Maps to WordPress post ID.
   */
  id: string;

  /**
   * URL-friendly accommodation identifier.
   * Maps to WordPress post slug.
   * @example "ellerman-house"
   */
  slug: string;

  /**
   * Accommodation name.
   * @example "Ellerman House"
   */
  title: string;

  /**
   * Brief accommodation description (1-2 sentences).
   */
  excerpt: string;

  /**
   * Full accommodation description (HTML allowed).
   */
  content: string;

  /**
   * Featured image URL.
   */
  featuredImage: string;

  /**
   * Accommodation Type taxonomy term IDs.
   * References AccommodationType.id values.
   * @example ["hotel", "boutique"]
   */
  types: string[];

  /**
   * Related Destination post IDs.
   * References Destination.id values.
   */
  destinations: string[];

  /**
   * Travel Style taxonomy term IDs.
   * References TravelStyle.id values.
   */
  travelStyles: string[];

  /**
   * Brand taxonomy term IDs.
   * References Brand.id values.
   * @example ["relais-chateaux"]
   */
  brands: string[];

  /**
   * Facility taxonomy term IDs.
   * References Facility.id values.
   * @example ["pool", "spa", "wifi"]
   */
  facilities: string[];

  /**
   * Star rating (1-5).
   * @example 5
   */
  rating: number;

  /**
   * List of amenities.
   * @example ["Ocean views", "Private butler", "Wine cellar"]
   */
  amenities: string[];

  /**
   * Available room types.
   * @example ["Deluxe Room", "Suite", "Villa"]
   */
  roomTypes: string[];

  /**
   * Location description.
   * @example "Bantry Bay, Cape Town"
   */
  location: string;
}

/**
 * Accommodation Type taxonomy term.
 * 
 * Categorizes accommodation by type (Hotel, Resort, Lodge, etc.).
 * 
 * @interface AccommodationType
 * @wordpressTaxonomy accommodation-type
 */
export interface AccommodationType {
  /**
   * Unique accommodation type identifier.
   */
  id: string;

  /**
   * URL-friendly accommodation type identifier.
   * @example "resort"
   */
  slug: string;

  /**
   * Accommodation type name.
   * @example "Resort"
   */
  name: string;

  /**
   * Accommodation type description.
   */
  description: string;

  /**
   * Related Accommodation post IDs.
   */
  accommodationIds: string[];
}

/**
 * Brand taxonomy term.
 * 
 * Represents accommodation brands/chains (e.g., Four Seasons, Relais & Châteaux).
 * 
 * @interface Brand
 * @wordpressTaxonomy brand
 */
export interface Brand {
  /**
   * Unique brand identifier.
   */
  id: string;

  /**
   * URL-friendly brand identifier.
   * @example "relais-chateaux"
   */
  slug: string;

  /**
   * Brand name.
   * @example "Relais & Châteaux"
   */
  name: string;

  /**
   * Brand description.
   */
  description: string;

  /**
   * Optional brand logo URL.
   */
  logo?: string;

  /**
   * Related Accommodation post IDs.
   */
  accommodationIds: string[];
}

/**
 * Facility taxonomy term.
 * 
 * Represents accommodation facilities/amenities (Pool, Spa, WiFi, etc.).
 * 
 * @interface Facility
 * @wordpressTaxonomy facility
 */
export interface Facility {
  /**
   * Unique facility identifier.
   */
  id: string;

  /**
   * URL-friendly facility identifier.
   * @example "pool"
   */
  slug: string;

  /**
   * Facility name.
   * @example "Swimming Pool"
   */
  name: string;

  /**
   * Facility description.
   */
  description: string;

  /**
   * Optional Phosphor icon name.
   * @example "Waves" | "Wifi" | "Coffee"
   */
  icon?: string;

  /**
   * Related Accommodation post IDs.
   */
  accommodationIds: string[];
}
