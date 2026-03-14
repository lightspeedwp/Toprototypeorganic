/**
 * Traveller Type domain TypeScript interfaces for the LightSpeed Tour Operator plugin.
 *
 * Traveller Types categorize tours by the type of traveller they are
 * best suited for (Solo, Couple, Multi-Generational, Family, Group).
 *
 * @module traveller-type-types
 * @category data/types
 * @wordpressTaxonomy traveller-type
 */

/**
 * Traveller Type taxonomy term.
 *
 * @interface TravellerType
 * @wordpressTaxonomy traveller-type
 */
export interface TravellerType {
  /**
   * Unique traveller type identifier.
   * Maps to WordPress term ID.
   */
  id: string;

  /**
   * URL-friendly traveller type identifier.
   * Maps to WordPress term slug.
   * @example "solo"
   */
  slug: string;

  /**
   * Traveller type name.
   * @example "Solo Traveller"
   */
  name: string;

  /**
   * Traveller type description.
   * Used on taxonomy archive pages.
   */
  description: string;

  /**
   * Featured image URL for the traveller type.
   */
  featuredImage?: string;

  /**
   * Related Tour post IDs.
   * Tours suited to this traveller type.
   */
  tourIds: string[];

  /**
   * Related Destination post IDs.
   * Destinations recommended for this traveller type.
   */
  destinationIds: string[];
}
