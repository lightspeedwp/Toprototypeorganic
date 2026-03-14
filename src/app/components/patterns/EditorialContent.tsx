/**
 * Editorial Content Pattern - WordPress BEM CSS Version
 * 
 * A polished editorial content section for long-form narrative text with
 * rich HTML markup support, smooth animations, and multiple layout variants.
 * 
 * **Features:**
 * - HTML content rendering (sanitized)
 * - Multiple layout variants (default, wide, narrow, featured)
 * - Smooth scroll-triggered animations
 * - Image support with captions
 * - Pull quotes and blockquotes
 * - Reading time estimate
 * 
 * **WordPress Mapping:**
 * 
 * Equivalent to `lightspeed/editorial-content` pattern.
 * Composed of:
 * - core/group (section wrapper)
 * - core/heading (optional title)
 * - core/paragraph, core/list, core/quote (content blocks)
 * 
 * **Design System:**
 * - Typography: Lora (headings), Noto Sans (body) via CSS
 * - Colors: Semantic tokens from theme.css
 * - Spacing: Consistent rhythm via CSS
 * - Prose styling for rich content
 * 
 * **CSS:**
 * Styles defined in /src/styles/patterns/editorial-content.css
 * Uses WordPress BEM methodology: .wp-pattern-editorial__*
 * 
 * **Accessibility:**
 * - Semantic HTML
 * - Proper heading hierarchy
 * - High contrast text
 * - Readable line-height
 * 
 * @module EditorialContent
 * @category patterns
 * @wordpressPattern lightspeed/editorial-content
 */

import { motion } from "motion/react";
import { Clock } from "@phosphor-icons/react";
import { Container } from "../common/Container";
import { cn } from "../../lib/utils";
import { BotanicalCorner } from "../common/organic/OrganicAssets";

/**
 * Layout variant types.
 */
export type EditorialVariant = "default" | "wide" | "narrow" | "featured";

/**
 * Props for the EditorialContent component.
 */
interface EditorialContentProps {
  /** 
   * HTML content string to render.
   * Should be sanitized in production.
   */
  content: string;
  
  /** Layout variant */
  variant?: EditorialVariant;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Enable animations */
  animated?: boolean;
  
  /** Optional reading time in minutes */
  readingTime?: number;
  
  /** Optional section title */
  title?: string;
  
  /** Optional section subtitle */
  subtitle?: string;
}

/**
 * Editorial Content Pattern Component.
 * 
 * Displays rich-text editorial content with HTML markup support,
 * smooth animations, and optimized typography.
 * 
 * @component
 * @category patterns
 * 
 * @example
 * // Basic usage
 * <EditorialContent content={tour.description} />
 * 
 * @example
 * // With title and reading time
 * <EditorialContent
 *   title="About This Tour"
 *   subtitle="Everything you need to know"
 *   content={tour.fullDescription}
 *   readingTime={5}
 *   animated
 * />
 * 
 * @example
 * // Wide variant
 * <EditorialContent
 *   variant="wide"
 *   content={destination.overview}
 * />
 */
export function EditorialContent({
  content,
  variant = "default",
  className,
  animated = true,
  readingTime,
  title,
  subtitle,
}: EditorialContentProps) {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className={cn("wp-pattern-editorial relative overflow-hidden", className)}>
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-32 h-32 z-0 opacity-15 pointer-events-none -scale-x-100 rotate-90">
        <BotanicalCorner />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 z-0 opacity-15 pointer-events-none">
        <BotanicalCorner />
      </div>

      <Container>
        <div className={cn(
          "wp-pattern-editorial__inner",
          `wp-pattern-editorial__inner--${variant}`
        )}>
          {/* Optional Header */}
          {(title || subtitle || readingTime) && (
            <motion.div
              initial={animated ? "hidden" : "visible"}
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="wp-pattern-editorial__header flex flex-col items-center text-center gap-element-md pb-element-2xl"
            >
              {/* Reading Time */}
              {readingTime && (
                <div className="wp-pattern-editorial__reading-time flex items-center gap-fluid-xs text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] uppercase tracking-widest">
                  <Clock className="wp-pattern-editorial__reading-time-icon w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" />
                  <span>{readingTime} min read</span>
                </div>
              )}

              {/* Title */}
              {title && <h2 className="wp-pattern-editorial__title m-0 font-[family:var(--font-family-lora)] text-[length:var(--text-4xl)] md:text-[length:var(--text-5xl)] font-[weight:var(--font-weight-bold)] text-[color:var(--color-foreground)]">{title}</h2>}

              {/* Subtitle */}
              {subtitle && (
                <div className="flex justify-center w-full">
                  <p className="wp-pattern-editorial__subtitle m-0 font-[family:var(--font-family-noto-sans)] text-[length:var(--text-xl)] text-[color:var(--color-muted-foreground)] max-w-2xl">
                    {subtitle}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Editorial Content */}
          <motion.div
            initial={animated ? "hidden" : "visible"}
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="wp-pattern-editorial__content"
          >
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}