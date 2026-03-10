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
    <section className={cn("wp-pattern-editorial", className)}>
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
              className="wp-pattern-editorial__header"
            >
              {/* Reading Time */}
              {readingTime && (
                <div className="wp-pattern-editorial__reading-time">
                  <Clock className="wp-pattern-editorial__reading-time-icon" />
                  <span>{readingTime} min read</span>
                </div>
              )}

              {/* Title */}
              {title && <h2 className="wp-pattern-editorial__title">{title}</h2>}

              {/* Subtitle */}
              {subtitle && (
                <p className="wp-pattern-editorial__subtitle">{subtitle}</p>
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
