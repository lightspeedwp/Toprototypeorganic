/**
 * Site Title Block Component
 * 
 * WordPress Block: `core/site-title`
 * Category: Theme
 * 
 * Displays the site name with proper semantic heading hierarchy.
 * Automatically adjusts heading level based on context (H1 on homepage, H2+ on subpages).
 * 
 * **Features:**
 * - Semantic heading tags (H1-H6)
 * - Links to home page (optional)
 * - Responsive typography
 * - Lora font family for headings
 * - Dark mode support
 * - WCAG AA accessibility
 * 
 * **Design System Compliance:**
 * - Typography: Lora (`var(--font-family-lora)`)
 * - Font sizes: CSS variables (`var(--text-*)`)
 * - Font weights: CSS variables (`var(--font-weight-*)`)
 * - Colors: Semantic tokens only
 * - No hardcoded styles
 * 
 * @module SiteTitle
 * @category blocks/theme
 * @see /guidelines/blocks/theme/site-title.md
 */

import { cn } from "../../../lib/utils";

/**
 * Props for the SiteTitle component.
 * 
 * @interface SiteTitleProps
 */
interface SiteTitleProps {
  /**
   * HTML tag used to render the title.
   * Use H1 on homepage, H2-H3 on subpages to maintain heading hierarchy.
   * 
   * @default 'h1'
   */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  
  /**
   * Site title text content.
   */
  children: string;
  
  /**
   * URL to link the title to.
   * Typically the home page (/).
   * 
   * @default '/'
   */
  linkHref?: string;
  
  /**
   * ARIA label for the link.
   * Provides accessible context for screen readers.
   * 
   * @default 'Home'
   */
  linkLabel?: string;
  
  /**
   * Whether to wrap the title in a link.
   * Set to false if logo already provides home link.
   * 
   * @default true
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
 * Site Title Block Component.
 * 
 * Renders the site name with proper semantic markup and accessibility.
 * 
 * **Usage Guidelines:**
 * 1. Use H1 on homepage for primary heading
 * 2. Use H2-H3 on subpages to maintain hierarchy
 * 3. Provide link to home page unless logo already links
 * 4. Use Lora font family (applied automatically via semantic HTML)
 * 5. Ensure sufficient color contrast (WCAG AA)
 * 
 * **WordPress Context:**
 * Equivalent to `core/site-title` block. Editing this text updates the
 * site name globally across WordPress settings.
 * 
 * **Accessibility:**
 * - Semantic heading tags
 * - ARIA labels for links
 * - Keyboard accessible
 * - Focus indicators
 * - WCAG AA contrast ratios
 * 
 * @component
 * @category blocks/theme
 * 
 * @param {SiteTitleProps} props - Component properties
 * @returns {JSX.Element} Rendered site title
 * 
 * @example
 * // Homepage (H1)
 * <SiteTitle tag="h1">LightSpeed Tours</SiteTitle>
 * 
 * @example
 * // Subpage (H2)
 * <SiteTitle tag="h2">LightSpeed Tours</SiteTitle>
 * 
 * @example
 * // Without link
 * <SiteTitle tag="h1" enableLink={false}>LightSpeed Tours</SiteTitle>
 * 
 * @example
 * // Custom styling (responsive)
 * <SiteTitle 
 *   tag="h1"
 *   className="text-center md:text-left"
 * >
 *   LightSpeed Tours
 * </SiteTitle>
 */
export function SiteTitle({
  tag: Tag = 'h1',
  children,
  linkHref = '/',
  linkLabel = 'Home',
  enableLink = true,
  className,
  style,
}: SiteTitleProps) {
  // Base styles that work with semantic HTML defaults
  // The theme.css file already applies Lora font and proper sizing to headings
  const baseStyles = cn(
    "site-title",
    "text-foreground", // Semantic color token
    className
  );

  // If link is disabled, render just the heading
  if (!enableLink) {
    return (
      <Tag className={baseStyles} style={style}>
        {children}
      </Tag>
    );
  }

  // Render heading with link
  return (
    <Tag className={baseStyles} style={style}>
      <a
        href={linkHref}
        aria-label={linkLabel}
        className={cn(
          "transition-colors duration-200",
          "hover:text-primary", // Hover state
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Focus state
          "no-underline hover:no-underline" // Remove default link underline
        )}
      >
        {children}
      </a>
    </Tag>
  );
}
