/**
 * Social Links Component — WordPress `core/social-links` equivalent.
 * 
 * Displays a list of social media icons linking to external profiles.
 * Adheres strictly to design system, using BEM CSS classes.
 * 
 * @module SocialLinks
 * @category components/common
 */

import {
  FacebookLogo,
  XLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
  GithubLogo,
  Envelope,
  Globe,
} from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

export type SocialPlatform =
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "github"
  | "email"
  | "website";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label?: string;
}

interface SocialLinksProps {
  /** Array of social links */
  links: SocialLink[];
  /** Icon size (default: "md") */
  size?: "sm" | "md" | "lg";
  /** Show labels (default: false) */
  showLabels?: boolean;
  /** Layout direction (default: "horizontal") */
  direction?: "horizontal" | "vertical";
  /** Additional CSS classes */
  className?: string;
}

const platformIcons: Record<string, any> = {
  facebook: FacebookLogo,
  twitter: XLogo,
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
  youtube: YoutubeLogo,
  github: GithubLogo,
  email: Envelope,
  website: Globe,
};

export function SocialLinks({
  links,
  size = "md",
  showLabels = false,
  direction = "horizontal",
  className,
}: SocialLinksProps) {
  const iconSize = size === "sm" ? 16 : size === "lg" ? 24 : 20;

  return (
    <nav 
      aria-label="Social media links" 
      className={cn(
        "wp-block-social-links",
        `wp-block-social-links--${direction}`,
        className
      )}
    >
      <ul className="wp-block-social-links__list">
        {links.map((link, index) => {
          const Icon = platformIcons[link.platform] || Globe;
          return (
            <li key={index} className="wp-block-social-links__item">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "wp-block-social-links__link",
                  showLabels && "wp-block-social-links__link--with-label"
                )}
                aria-label={link.label || `Follow us on ${link.platform}`}
              >
                <Icon size={iconSize} weight="fill" aria-hidden="true" className="wp-block-social-links__icon" />
                {showLabels && (
                  <span className="wp-block-social-links__label">{link.label || link.platform}</span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SocialLinks;