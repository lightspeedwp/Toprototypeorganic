/**
 * Site Tagline Block Component
 * 
 * WordPress Block: `core/site-tagline`
 * Category: Theme
 * 
 * Displays a short description or slogan for the website.
 * Typically placed below or next to the site title in headers/footers.
 * 
 * **Features:**
 * - Short descriptive text (5-10 words)
 * - Noto Sans font family
 * - Muted color for visual hierarchy
 * - Optional link to home page
 * - Responsive visibility
 * - Dark mode support
 * 
 * **Design System Compliance:**
 * - Typography: Noto Sans (`var(--font-family-noto-sans)`)
 * - Font sizes: CSS variables (`var(--text-*)`)
 * - Font weights: CSS variables (`var(--font-weight-*)`)
 * - Colors: Semantic tokens only
 * - No hardcoded styles
 * 
 * @module SiteTagline
 * @category blocks/theme
 * @see /guidelines/blocks/theme/site-tagline.md
 */

import { cn } from "../../../lib/utils";

/**
 * Props for the SiteTagline component.
 * 
 * @interface SiteTaglineProps
 */
interface SiteTaglineProps {
  /**
   * HTML tag used to render the tagline.
   * Typically 'p' or 'span'.
   * 
   * @default 'p'
   */
  tag?: 'p' | 'span' | 'div';
  
  /**
   * Tagline text content.
   * Keep short and descriptive (5-10 words).
   */
  children: string;
  
  /**
   * URL to link the tagline to.
   * Optional. Only use if no other home link exists.
   * 
   * @default undefined
   */
  linkHref?: string;
  
  /**
   * ARIA label for the link.
   * 
   * @default 'Home'
   */
  linkLabel?: string;
  
  /**
   * Whether to wrap the tagline in a link.
   * Typically false; logo or site title already links home.
   * 
   * @default false
   */
  enableLink?: boolean;
  
  /**
   * Additional CSS classes to apply.
   */
  className?: string;
  
  /**
   * Inline style overrides.
   * Use sparingly; prefer className and CSS variables.
   */
  style?: React.CSSProperties;
}

/**
 * Site Tagline Block Component.
 * 
 * Renders the site tagline with proper typography and accessibility.
 * 
 * **Usage Guidelines:**
 * 1. Keep tagline short (5-10 words maximum)
 * 2. Use smaller font size than site title
 * 3. Position below or beside site title/logo
 * 4. Use muted color for visual hierarchy
 * 5. Optionally hide on mobile with `hidden sm:block`
 * 
 * **WordPress Context:**
 * Equivalent to `core/site-tagline` block. Editing this text updates
 * the tagline globally across WordPress settings and affects SEO.
 * 
 * **Accessibility:**
 * - Semantic HTML tags
 * - Sufficient color contrast
 * - ARIA labels if linked
 * - Not misused as heading
 * 
 * @component
 * @category blocks/theme
 * 
 * @param {SiteTaglineProps} props - Component properties
 * @returns {JSX.Element} Rendered site tagline
 * 
 * @example
 * // Basic usage (below site title)
 * <SiteTagline>Unforgettable African Adventures</SiteTagline>
 * 
 * @example
 * // With custom styling (muted)
 * <SiteTagline className="text-muted-foreground text-sm">
 *   Expert-guided safari experiences
 * </SiteTagline>
 * 
 * @example
 * // Hidden on mobile
 * <SiteTagline className="hidden sm:block">
 *   Discover the wild side of Africa
 * </SiteTagline>
 * 
 * @example
 * // With link (rare)
 * <SiteTagline 
 *   enableLink={true}
 *   linkHref="/"
 *   linkLabel="Go to homepage"
 * >
 *   Premium tours since 2010
 * </SiteTagline>
 */
export function SiteTagline({
  tag: Tag = 'p',
  children,
  linkHref = '/',
  linkLabel = 'Home',
  enableLink = false,
  className,
  style,
}: SiteTaglineProps) {
  // Base styles using design system tokens
  // Noto Sans font is applied automatically to <p> tags via semantic HTML rules
  const baseStyles = cn(
    "site-tagline",
    "text-muted-foreground", // Muted color for hierarchy
    "mb-0", // Override default paragraph margin
    className
  );

  // Content element
  const content = children;

  // If link is disabled, render just the tag
  if (!enableLink) {
    return (
      <Tag className={baseStyles} style={style}>
        {content}
      </Tag>
    );
  }

  // Render with link
  return (
    <Tag className={baseStyles} style={style}>
      <a
        href={linkHref}
        aria-label={linkLabel}
        className={cn(
          "transition-colors duration-200",
          "hover:text-primary", // Hover state
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Focus state
          "no-underline hover:underline" // Link styling
        )}
      >
        {content}
      </a>
    </Tag>
  );
}
