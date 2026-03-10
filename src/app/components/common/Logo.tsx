/**
 * Site Logo component with dark mode support.
 *
 * Uses inline SVG components for reliable rendering in all environments.
 * Automatically switches between light and dark variants via CSS.
 *
 * Brand colors in the SVG icon are hardcoded (acceptable exception per guidelines):
 * - Teal circle: #66C0B8
 * - Orange play button: #FF6B3B
 *
 * Wordmark text uses `currentColor` — automatically inherits from
 * `var(--color-foreground)` (dark in light mode, white in dark mode).
 *
 * Uses WordPress BEM CSS classes (NO dark: Tailwind classes):
 * - .wp-common-logo - Base logo styling
 * - .wp-common-logo--light - Light mode logo (visible in light, hidden in dark)
 * - .wp-common-logo--dark - Dark mode logo (hidden in light, visible in dark)
 * - .wp-common-logo--{size} - Size variants (sm, md, lg, xl)
 *
 * @module Logo
 * @category common
 * @see /guidelines/components/Logo.md
 * @see /src/styles/common/logo.css
 */

import { cn } from "../../lib/utils";
import { LogoLight, LogoDark } from "./LogoSVG";
import { SITE_CONFIG } from "../../data/site-config";

interface LogoProps {
  /** Optional additional CSS classes. */
  className?: string;

  /**
   * Size variant for the logo.
   * @default 'sm'
   */
  size?: "sm" | "md" | "lg" | "xl";

  /** Optional click handler. Overrides default scroll-to-top. */
  onClick?: () => void;

  /**
   * When true, renders only the images without an `<a>` wrapper.
   * Use this when the Logo is already inside a clickable parent.
   * @default false
   */
  bare?: boolean;
}

export function Logo({ className, size = "sm", onClick, bare = false }: LogoProps) {
  const images = (
    <>
      {/* Light mode: dark text wordmark (visible in light mode, hidden in dark mode) */}
      <LogoLight
        className={cn("wp-common-logo", "wp-common-logo--light", `wp-common-logo--${size}`)}
      />
      {/* Dark mode: light text wordmark (hidden in light mode, visible in dark mode) */}
      <LogoDark
        className={cn("wp-common-logo", "wp-common-logo--dark", `wp-common-logo--${size}`)}
      />
    </>
  );

  if (bare) {
    return (
      <span
        className={cn("wp-common-logo-wrapper", className)}
        role="img"
        aria-label={SITE_CONFIG.name}
      >
        {images}
      </span>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <a
      href="/"
      onClick={handleClick}
      className={cn("wp-common-logo-link", className)}
      aria-label={`${SITE_CONFIG.name} - Home`}
    >
      {images}
    </a>
  );
}
