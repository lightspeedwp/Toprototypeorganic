/**
 * Site Logo Block Component
 *
 * WordPress Block: `core/site-logo`
 * Displays the site logo with dark mode support and automatic switching.
 *
 * Uses WordPress BEM CSS classes (NO dark: Tailwind classes):
 * - .wp-common-logo - Base logo styling
 * - .wp-common-logo--light - Light mode logo
 * - .wp-common-logo--dark - Dark mode logo
 *
 * @module SiteLogo
 * @category blocks/theme
 * @see /src/styles/common/logo.css
 */

import { cn } from "../../../lib/utils";
import { LogoLight, LogoDark } from "../../common/LogoSVG";

interface SiteLogoProps {
  src?: string;
  srcDark?: string;
  alt?: string;
  width?: string;
  linkHref?: string;
  linkLabel?: string;
  enableLink?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function SiteLogo({
  src,
  srcDark,
  alt = "Site Logo",
  width = "150px",
  linkHref = "/",
  linkLabel = "Home",
  enableLink = true,
  className,
  style,
  onClick,
}: SiteLogoProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else if (!enableLink) {
      e.preventDefault();
    }
  };

  // Inline SVG logo for reliable rendering (no external file dependency)
  const renderEmbeddedLogo = () => (
    <>
      {/* Light mode logo (visible in light mode, hidden in dark mode) */}
      <LogoLight
        className="wp-common-logo wp-common-logo--light"
      />
      {/* Dark mode logo (hidden in light mode, visible in dark mode) */}
      <LogoDark
        className="wp-common-logo wp-common-logo--dark"
      />
    </>
  );

  // External image logos when src is provided
  const renderExternalLogo = () => {
    const logoStyle = { '--logo-width': width, ...style } as React.CSSProperties;
    if (srcDark) {
      return (
        <>
          {/* Light mode image (visible in light mode, hidden in dark mode) */}
          <img
            src={src}
            alt={alt}
            className="wp-common-logo wp-common-logo--light"
            style={logoStyle}
          />
          {/* Dark mode image (hidden in light mode, visible in dark mode) */}
          <img
            src={srcDark}
            alt={alt}
            className="wp-common-logo wp-common-logo--dark"
            style={logoStyle}
          />
        </>
      );
    }
    return (
      <img
        src={src}
        alt={alt}
        className="wp-common-logo"
        style={logoStyle}
      />
    );
  };

  const logoContent = src ? renderExternalLogo() : renderEmbeddedLogo();

  if (!enableLink) {
    return <div className={cn("site-logo", className)}>{logoContent}</div>;
  }

  return (
    <a
      href={linkHref}
      onClick={handleClick}
      aria-label={linkLabel}
      className={cn("wp-common-logo-link", className)}
    >
      {logoContent}
    </a>
  );
}