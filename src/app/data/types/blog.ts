/**
 * Blog domain TypeScript interfaces for the LightSpeed Tour Operator plugin.
 *
 * Standard blog/news posts and related taxonomy terms.
 *
 * @module blog-types
 * @category data/types
 * @wordpressPostType post
 */

/**
 * Blog Post custom post type.
 * 
 * @interface BlogPost
 */
export interface BlogPost {
  /**
   * Unique post identifier.
   */
  id: string;

  /**
   * URL-friendly post identifier.
   * @example "botswanas-thriving-wonders"
   */
  slug: string;

  /**
   * Post title.
   * @example "Botswana's Thriving Wonders"
   */
  title: string;

  /**
   * Brief post description (1-2 sentences).
   */
  excerpt: string;

  /**
   * Full post content (HTML allowed).
   */
  content: string;

  /**
   * Featured image URL.
   */
  featuredImage: string;

  /**
   * Post author name.
   * @example "Sarah Johnson"
   */
  author: string;

  /**
   * Publication date.
   * @example "2024-03-15"
   */
  date: string;

  /**
   * Blog Category taxonomy term IDs.
   * References BlogCategory.id values.
   */
  categories: string[];

  /**
   * Blog Tag taxonomy term IDs.
   * References BlogTag.id values.
   */
  tags: string[];
}

/**
 * Blog Category taxonomy term.
 * 
 * @interface BlogCategory
 * @wordpressTaxonomy category
 */
export interface BlogCategory {
  /**
   * Unique category identifier.
   */
  id: string;

  /**
   * URL-friendly category identifier.
   * @example "news"
   */
  slug: string;

  /**
   * Category name.
   * @example "News"
   */
  name: string;

  /**
   * Category description.
   */
  description: string;

  /**
   * Related BlogPost post IDs.
   */
  postIds: string[];
}

/**
 * Blog Tag taxonomy term.
 * 
 * @interface BlogTag
 * @wordpressTaxonomy post_tag
 */
export interface BlogTag {
  /**
   * Unique tag identifier.
   */
  id: string;

  /**
   * URL-friendly tag identifier.
   * @example "wildlife"
   */
  slug: string;

  /**
   * Tag name.
   * @example "Wildlife"
   */
  name: string;

  /**
   * Related BlogPost post IDs.
   */
  postIds: string[];
}
