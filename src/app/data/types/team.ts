/**
 * Team domain TypeScript interfaces for the LightSpeed Tour Operator plugin.
 *
 * Team/staff members displayed on the Team page and consultant references.
 *
 * @module team-types
 * @category data/types
 * @wordpressPostType team
 */

/**
 * Team Member custom post type.
 * 
 * @interface TeamMember
 */
export interface TeamMember {
  /**
   * Unique team member identifier.
   */
  id: string;

  /**
   * URL-friendly team member identifier.
   * @example "sarah-johnson"
   */
  slug: string;

  /**
   * Team member full name.
   * @example "Sarah Johnson"
   */
  name: string;

  /**
   * Job title/role.
   * @example "Senior Travel Consultant"
   */
  role: string;

  /**
   * Full biography (HTML allowed).
   */
  bio: string;

  /**
   * Brief bio (1-2 sentences).
   */
  excerpt: string;

  /**
   * Profile photo URL.
   */
  featuredImage: string;

  /**
   * Contact email address.
   * @example "sarah@example.com"
   */
  email: string;

  /**
   * Contact phone number.
   * @example "+1 555-0123"
   */
  phone: string;

  /**
   * Areas of specialty.
   * @example ["Africa", "Adventure Travel", "Family Vacations"]
   */
  specialties: string[];

  /**
   * Team Role taxonomy term IDs.
   * References TeamRole.id values.
   */
  roleIds?: string[];
}
