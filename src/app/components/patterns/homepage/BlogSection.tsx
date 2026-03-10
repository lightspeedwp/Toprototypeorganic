/**
 * Blog section for the homepage.
 *
 * This section showcases recent blog posts on the front page.
 * Refactored to use FeaturedSection wrapper.
 *
 * **WordPress CSS:**
 * Uses BEM classes for consistent styling:
 * - .wp-template-home__blog
 * - .wp-template-home__blog-grid
 *
 * @module BlogSection
 * @category components/patterns/homepage
 */

import { FeaturedSection } from "../FeaturedSection";
import { BlogCard } from "../BlogCard";
import type { BlogPost } from "../../../data/types";

/**
 * Props for the BlogSection component.
 */
interface BlogSectionProps {
  /** Array of blog post objects to display. */
  posts: BlogPost[];
  /** Section header data (title, description). */
  section: {
    title: string;
    description: string;
    viewAllLabel?: string;
    viewAllHref?: string;
  };
  /** Callback for navigation. */
  onNavigate: (path: string) => void;
}

/**
 * BlogSection Component.
 */
export function BlogSection({ posts, section, onNavigate }: BlogSectionProps) {
  return (
    <FeaturedSection
      className="wp-template-home__blog"
      header={{
        title: section.title,
        description: section.description,
        prefix: "wp-template-home__section",
      }}
      items={posts}
      gridClassName="wp-featured-section__grid--cols-3"
      renderCard={(post) => (
        <BlogCard
          post={post}
          onClick={() => onNavigate("/blog/" + post.slug)}
        />
      )}
      viewAll={
        section.viewAllLabel && section.viewAllHref
          ? {
              label: section.viewAllLabel,
              onClick: () => onNavigate(section.viewAllHref!),
              variant: "primary",
            }
          : undefined
      }
    />
  );
}

export default BlogSection;
