/**
 * Blog Card Pattern Component
 * 
 * Displays a blog post with featured image, categories, and author info.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Calendar, User, Clock, ArrowRight } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import type { BlogPost } from "../../data/types";
import { motion } from "motion/react";

interface BlogCardProps {
  post: BlogPost;
  onClick?: () => void;
  showCategories?: boolean;
  showReadingTime?: boolean;
  layout?: "card" | "horizontal";
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function BlogCard({
  post,
  onClick,
  showCategories = true,
  showReadingTime = true,
  layout = "card",
}: BlogCardProps) {
  const readingTime = calculateReadingTime(post.content || post.excerpt);

  return (
    <article
      onClick={onClick}
      className={cn(
        "wp-card wp-card--blog group",
        layout === "horizontal" && "wp-card--blog--horizontal",
        onClick && "cursor-pointer"
      )}
    >
      {/* Featured Image */}
      <div className="wp-card__image-wrapper">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="wp-card__image"
          loading="lazy"
        />
        <div className="wp-card__image-overlay" />
        
        {/* Category Badges */}
        {showCategories && post.categories && post.categories.length > 0 && (
          <div className="wp-card__badge-container">
            {post.categories.slice(0, 2).map((category) => (
              <span key={category} className="wp-card__badge">
                {category}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="wp-card__content">
        {/* Meta Header */}
        <div className="wp-card__meta">
          <div className="wp-card__meta-item">
            <Calendar className="wp-card__meta-icon" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          {showReadingTime && (
            <div className="wp-card__meta-item">
              <Clock className="wp-card__meta-icon" />
              <span>{readingTime} min read</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="wp-card__title">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="wp-card__description">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="wp-card__footer">
          <div className="wp-card__author">
            <div className="wp-card__author-avatar">
              {post.author.charAt(0)}
            </div>
            <span className="wp-card__author-name">{post.author}</span>
          </div>
          
          <div className="wp-card__action">
            Read Article <ArrowRight className="wp-card__action-icon" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;