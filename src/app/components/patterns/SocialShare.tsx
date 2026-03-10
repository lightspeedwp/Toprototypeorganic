/**
 * Social Share Pattern - WordPress BEM CSS Version
 * 
 * Provides social media sharing buttons for tours, destinations, blog posts, etc.
 * Includes share functionality for major platforms plus copy link.
 * 
 * **Features:**
 * - Facebook, Twitter, LinkedIn, WhatsApp, Email sharing
 * - Copy link functionality
 * - Mobile-responsive
 * - Toast notifications
 * - Accessible labels
 * - Multiple display variants (buttons, icons, compact)
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css via CSS
 * - Typography: Noto Sans (body text)
 * - Colors: Semantic tokens (background, foreground, muted)
 * - Spacing: Consistent gap and padding
 * 
 * **CSS:**
 * Styles defined in /src/styles/patterns/social-share.css
 * Uses WordPress BEM methodology: .wp-pattern-social-share__*
 * 
 * @module SocialShare
 * @category patterns
 */

import { FacebookLogo as Facebook, TwitterLogo as Twitter, LinkedinLogo as Linkedin, EnvelopeSimple as Mail, Link as Link2, ChatCircle as MessageCircle, Check } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { toast } from "sonner";

/**
 * Social share button configuration.
 */
interface ShareButton {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  getUrl: (url: string, title: string, description?: string) => string;
  platform: string;
}

/**
 * Social share component props.
 */
interface SocialShareProps {
  /** Page URL to share */
  url?: string;
  /** Title/heading to share */
  title: string;
  /** Description/excerpt to share */
  description?: string;
  /** Display variant */
  variant?: "buttons" | "icons" | "compact";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Show labels */
  showLabels?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Social Share Pattern Component
 * 
 * @example
 * <SocialShare
 *   title="Amazing Safari Tour in Kenya"
 *   description="Experience the wonders of African wildlife"
 *   variant="buttons"
 *   showLabels
 * />
 */
export function SocialShare({
  url,
  title,
  description = "",
  variant = "buttons",
  size = "md",
  showLabels = true,
  className,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  
  // Use current URL if not provided
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  
  // Encode URL and text for sharing
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  /**
   * Social share buttons configuration.
   */
  const shareButtons: ShareButton[] = [
    {
      name: "Facebook",
      platform: "facebook",
      icon: Facebook,
      getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: "Twitter",
      platform: "twitter",
      icon: Twitter,
      getUrl: (url, title) => `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    },
    {
      name: "LinkedIn",
      platform: "linkedin",
      icon: Linkedin,
      getUrl: (url, title) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      name: "WhatsApp",
      platform: "whatsapp",
      icon: MessageCircle,
      getUrl: (url, title) => `https://wa.me/?text=${title}%20${url}`,
    },
    {
      name: "Email",
      platform: "email",
      icon: Mail,
      getUrl: (url, title, desc) => 
        `mailto:?subject=${title}&body=${desc}%0A%0A${url}`,
    },
  ];

  /**
   * Handle social share click.
   */
  const handleShare = (button: ShareButton) => {
    const shareUrl = button.getUrl(encodedUrl, encodedTitle, encodedDescription);
    
    // Open share URL in popup for web platforms
    if (button.name !== "Email" && button.name !== "WhatsApp") {
      window.open(
        shareUrl,
        "share-dialog",
        "width=600,height=400,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no"
      );
    } else {
      // Open in same window for Email and WhatsApp
      window.location.href = shareUrl;
    }
    
    toast.success(`Sharing via ${button.name}`);
  };

  /**
   * Copy link to clipboard.
   */
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
      console.error("Copy failed:", error);
    }
  };

  /**
   * Render button variant.
   */
  if (variant === "buttons") {
    return (
      <div className={cn("wp-pattern-social-share", "wp-pattern-social-share--buttons", className)}>
        {showLabels && (
          <span className="wp-pattern-social-share__label">Share:</span>
        )}
        
        {shareButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.name}
              onClick={() => handleShare(button)}
              className={cn(
                "wp-pattern-social-share__button",
                `wp-pattern-social-share__button--${size}`,
                `wp-pattern-social-share__button--${button.platform}`
              )}
              aria-label={`Share on ${button.name}`}
            >
              <Icon className="wp-pattern-social-share__icon" />
              {showLabels && <span>{button.name}</span>}
            </button>
          );
        })}
        
        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className={cn(
            "wp-pattern-social-share__button",
            "wp-pattern-social-share__button--copy",
            `wp-pattern-social-share__button--${size}`,
            copied && "wp-pattern-social-share__button--copied"
          )}
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <Check className="wp-pattern-social-share__icon" />
              {showLabels && <span>Copied!</span>}
            </>
          ) : (
            <>
              <Link2 className="wp-pattern-social-share__icon" />
              {showLabels && <span>Copy Link</span>}
            </>
          )}
        </button>
      </div>
    );
  }

  /**
   * Render icons variant.
   */
  if (variant === "icons") {
    return (
      <div className={cn("wp-pattern-social-share", "wp-pattern-social-share--icons", className)}>
        {showLabels && (
          <span className="wp-pattern-social-share__label">Share:</span>
        )}
        
        {shareButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.name}
              onClick={() => handleShare(button)}
              className={cn(
                "wp-pattern-social-share__icon-button",
                `wp-pattern-social-share__icon-button--${button.platform}`
              )}
              aria-label={`Share on ${button.name}`}
            >
              <Icon className="wp-pattern-social-share__icon" />
            </button>
          );
        })}
        
        {/* Copy Link Icon */}
        <button
          onClick={handleCopyLink}
          className={cn(
            "wp-pattern-social-share__icon-button",
            "wp-pattern-social-share__icon-button--copy",
            copied && "wp-pattern-social-share__icon-button--copied"
          )}
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="wp-pattern-social-share__icon" />
          ) : (
            <Link2 className="wp-pattern-social-share__icon" />
          )}
        </button>
      </div>
    );
  }

  /**
   * Render compact variant.
   */
  return (
    <div className={cn("wp-pattern-social-share", "wp-pattern-social-share--compact", className)}>
      <button
        onClick={handleCopyLink}
        className={cn(
          "wp-pattern-social-share__compact-button",
          copied && "wp-pattern-social-share__compact-button--copied"
        )}
        aria-label="Share"
      >
        {copied ? (
          <>
            <Check className="wp-pattern-social-share__icon" />
            <span>Link Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="wp-pattern-social-share__icon" />
            <span>Share</span>
          </>
        )}
      </button>
    </div>
  );
}

export default SocialShare;
