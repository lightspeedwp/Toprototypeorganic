/**
 * Review domain TypeScript interfaces for the LightSpeed Tour Operator plugin.
 *
 * Customer reviews for tours, destinations, or accommodation.
 *
 * @module review-types
 * @category data/types
 * @wordpressPostType review
 */

/**
 * Review custom post type.
 * 
 * @interface Review
 */
export interface Review {
  /**
   * Unique review identifier.
   */
  id: string;

  /**
   * URL-friendly review identifier.
   */
  slug: string;

  /**
   * Review title/headline.
   * @example "Amazing Iceland Experience!"
   */
  title: string;

  /**
   * Brief review excerpt (1-2 sentences).
   */
  excerpt?: string;

  /**
   * Full review content.
   */
  content: string;

  /**
   * Star rating (1-5).
   * @example 5
   */
  rating: number;

  /**
   * Reviewer name.
   * @example "John Smith"
   */
  author: string;

  /**
   * Reviewer location.
   * @example "New York, USA"
   */
  authorLocation: string;

  /**
   * Review date.
   * @example "2024-02-15"
   */
  date: string;

  /**
   * Related Tour post ID (if review is for a tour).
   */
  tourId?: string;

  /**
   * Related Destination post ID (if review is for a destination).
   */
  destinationId?: string;

  /**
   * Related Accommodation post ID (if review is for accommodation).
   */
  accommodationId?: string;

  /**
   * Whether the review has been verified.
   */
  verified: boolean;

  /**
   * Optional reviewer photo URL.
   */
  featuredImage?: string;

  /**
   * Review category taxonomy term IDs.
   * References ReviewCategory.id values.
   */
  categories?: string[];

  /**
   * Team member who managed the reviewed trip.
   * References TeamMember.id.
   */
  teamMemberId?: string;

  /**
   * Travel date (when the trip occurred).
   * @example "2024-01"
   */
  travelDate?: string;

  /**
   * Trip duration.
   * @example "7 days"
   */
  tripDuration?: string;

  /**
   * Group composition.
   * @example "Couple" | "Family" | "Solo" | "Friends"
   */
  groupType?: string;

  /**
   * Would the reviewer recommend this experience?
   */
  wouldRecommend?: boolean;

  /**
   * Individual aspect ratings.
   */
  aspectRatings?: {
    service?: number;
    value?: number;
    accommodation?: number;
    activities?: number;
    food?: number;
    guide?: number;
  };
}
