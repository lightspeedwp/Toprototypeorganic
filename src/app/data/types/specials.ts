/**
 * Specials domain TypeScript interfaces for the LightSpeed Tour Operator plugin.
 *
 * Represents promotional offers and special deals.
 *
 * @module special-types
 * @category data/types
 * @wordpressPostType special
 */

/**
 * Special custom post type.
 * 
 * @interface Special
 */
export interface Special {
  /**
   * Unique special identifier.
   */
  id: string;

  /**
   * URL-friendly special identifier.
   * @example "honeymoon-promotion"
   */
  slug: string;

  /**
   * Special offer title.
   * @example "Honeymoon Promotion"
   */
  title: string;

  /**
   * Brief special description.
   */
  excerpt: string;

  /**
   * Full special description (HTML allowed).
   */
  content: string;

  /**
   * Featured image URL.
   */
  featuredImage: string;

  /**
   * Discount amount/percentage.
   * @example "20% off" | "$500 discount"
   */
  discount: string;

  /**
   * Offer valid from date.
   * @example "2024-01-01"
   */
  validFrom: string;

  /**
   * Offer valid until date.
   * @example "2024-12-31"
   */
  validTo: string;

  /**
   * Related Travel Style taxonomy term IDs.
   */
  travelStyles: string[];

  /**
   * Terms and conditions.
   */
  terms: string;

  /**
   * Special Category taxonomy term IDs.
   * References SpecialCategory.id values.
   */
  categories?: string[];
}
