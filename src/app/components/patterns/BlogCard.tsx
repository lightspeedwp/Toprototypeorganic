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
import { BotanicalCorner } from "../common/organic/OrganicAssets";

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
        "wp-card wp-card--blog group has-organic-assets",
        layout === "horizontal" && "wp-card--blog--horizontal",
        onClick && "cursor-pointer"
      )}
    >
      {/* Botanical Flourish */}
      <BotanicalCorner className="wp-part-botanical-ornament--top-right" />

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
      <div className="wp-card__content flex flex-col flex-grow p-element-lg">
        <div className="flex flex-col gap-element-md flex-1">
          {/* Meta Header */}
          <div className="wp-card__meta flex items-center gap-fluid-md font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)]">
            <div className="wp-card__meta-item flex items-center gap-fluid-xs">
              <Calendar className="wp-card__meta-icon w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            {showReadingTime && (
              <div className="wp-card__meta-item flex items-center gap-fluid-xs">
                <Clock className="wp-card__meta-icon w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" />
                <span>{readingTime} min read</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="wp-card__title m-0 font-[family:var(--font-family-lora)] text-[length:var(--text-xl)] text-[color:var(--color-foreground)] leading-tight">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="wp-card__description m-0 pb-element-md font-[family:var(--font-family-noto-sans)] text-[length:var(--text-base)] text-[color:var(--color-muted-foreground)] line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Footer */}
        <div className="wp-card__footer flex items-center justify-between pt-element-md border-t border-[color:var(--color-border)]">
          <div className="wp-card__author flex items-center gap-fluid-sm">
            <div className="wp-card__author-avatar flex items-center justify-center w-[32px] h-[32px] rounded-[var(--radius-full)] bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-bold)] text-[length:var(--text-sm)]">
              {post.author.charAt(0)}
            </div>
            <span className="wp-card__author-name font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)]">{post.author}</span>
          </div>
          
          <div className="wp-card__action flex items-center gap-fluid-sm font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[weight:var(--font-weight-bold)] text-[color:var(--color-primary)]">
            Read Article <ArrowRight className="wp-card__action-icon w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;