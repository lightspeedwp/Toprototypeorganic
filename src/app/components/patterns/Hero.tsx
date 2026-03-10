/**
 * Hero Pattern Component — Single Source of Truth
 *
 * THE canonical hero section for ALL pages in the prototype.
 * Renders: badge → title → description → buttons → scroll-down arrow.
 * Every field is optional — if a value is absent it simply doesn't render.
 *
 * Data is pulled from `/src/app/data/content/heroes.ts` via the `context`
 * prop. Direct props (`title`, `description`, etc.) override data-file values,
 * so pages can customise on a case-by-case basis when required.
 *
 * Styled via `/src/styles/patterns/hero.css` (BEM, CSS custom-properties only).
 *
 * @module Hero
 * @category patterns
 */

import { useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import * as PhosphorIcons from "@phosphor-icons/react";
import { Container } from "../common/Container";
import { ScrollDownArrow } from "../common/ScrollDownArrow";
import { cn } from "../../lib/utils";
import { getHeroContent } from "../../data/content/heroes";
import type { HeroContent } from "../../data/types";

/* ------------------------------------------------------------------ */
/*  Icon resolver                                                      */
/* ------------------------------------------------------------------ */

/**
 * Map Lucide icon names to Phosphor icon names.
 * This allows hero data to continue using Lucide names while rendering Phosphor icons.
 */
const ICON_MAP: Record<string, string> = {
  Compass: "Compass",
  Binoculars: "Binoculars",
  MapPin: "MapPin",
  Bed: "Bed",
  BookOpen: "BookOpen",
  Users: "Users",
  Percent: "Percent",
  Star: "Star",
  Heart: "Heart",
  MessageCircle: "ChatCircle",
  CircleHelp: "Question",
  Award: "Trophy",
  Send: "PaperPlaneTilt",
  Map: "Map",
  Shield: "Shield",
  Mail: "Envelope",
  Luggage: "Suitcase",
  Leaf: "Leaf",
  FileText: "FileText",
  Search: "MagnifyingGlass",
  Calendar: "Calendar",
  Route: "Path",
  User: "User",
  Terminal: "Terminal",
  CreditCard: "CreditCard",
};

/** Resolve a Phosphor icon by name string (with Lucide compatibility). Returns undefined if not found. */
function resolveIcon(name?: string): React.ComponentType<{ className?: string; weight?: string }> | undefined {
  if (!name) return undefined;
  // Map Lucide name to Phosphor name
  const phosphorName = ICON_MAP[name] || name;
  const icon = (PhosphorIcons as Record<string, unknown>)[phosphorName];
  return typeof icon === "function"
    ? (icon as React.ComponentType<{ className?: string; weight?: string }>)
    : undefined;
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface HeroProps {
  /** Data-file context key — looks up hero data from getHeroContent(). */
  context?: string;

  /* Direct overrides (win over data-file values when supplied) */
  title?: string;
  intro?: string;
  description?: string;
  subtitle?: string;
  image?: string;
  backgroundImage?: string;

  /** Badge / chip above the title. */
  badge?: { icon?: string; label: string };

  primaryCTA?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ComponentType<{ className?: string }>;
  };
  secondaryCTA?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "outline" | "ghost";
  };

  className?: string;
  height?: "small" | "medium" | "large" | "full";
  overlay?: "none" | "light" | "medium" | "dark";
  showScrollIndicator?: boolean;
  animated?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Hero({
  context,
  title: titleProp,
  intro,
  description: descProp,
  subtitle,
  image: imageProp,
  backgroundImage,
  badge: badgeProp,
  primaryCTA: primaryCTAProp,
  secondaryCTA: secondaryCTAProp,
  className,
  height: heightProp,
  overlay: overlayProp,
  showScrollIndicator: scrollProp,
  animated = true,
}: HeroProps) {
  const navigate = useNavigate();

  /* ── Merge data-file values with direct props ─────────────────── */
  const data: HeroContent | undefined = context ? getHeroContent(context) : undefined;

  const title = titleProp ?? data?.title ?? "";
  const displayIntro = intro ?? descProp ?? subtitle ?? data?.description;
  const heroImage = imageProp ?? backgroundImage ?? data?.image;
  const height = heightProp ?? data?.height ?? "medium";
  const overlay = overlayProp ?? data?.overlay ?? "medium";
  const showScroll = scrollProp ?? data?.showScrollIndicator ?? false;

  /* Badge — direct prop wins, then data file */
  const badge = badgeProp ?? data?.badge;
  const BadgeIcon = resolveIcon(badge?.icon);

  /* CTAs — build from direct props or data file */
  const primaryCTA = primaryCTAProp ?? (data?.primaryCTALabel
    ? { label: data.primaryCTALabel, href: data.primaryCTAHref }
    : undefined);

  const secondaryCTA = secondaryCTAProp ?? (data?.secondaryCTALabel
    ? { label: data.secondaryCTALabel, href: data.secondaryCTAHref }
    : undefined);

  /* ── Parallax ─────────────────────────────────────────────────── */
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleParallax = useCallback(() => {
    const section = sectionRef.current;
    const img = imageRef.current;
    if (!section || !img) return;
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;
    if (rect.bottom < 0 || rect.top > windowH) return;
    const progress = 1 - rect.bottom / (windowH + rect.height);
    const offset = (progress - 0.5) * 100;
    img.style.transform = `translateY(${offset}px) scale(1.2)`;
  }, []);

  useEffect(() => {
    if (!heroImage) return;
    window.addEventListener("scroll", handleParallax, { passive: true });
    handleParallax();
    return () => window.removeEventListener("scroll", handleParallax);
  }, [heroImage, handleParallax]);

  /* ── Navigation helpers ───────────────────────────────────────── */
  const handleNav = (href?: string, onClick?: () => void) => () => {
    if (onClick) { onClick(); return; }
    if (href) navigate(href);
  };

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className={cn(
        "wp-pattern-hero",
        `wp-pattern-hero--${height}`,
        heroImage && "wp-pattern-hero--with-background",
        className,
      )}
    >
      {/* Background Media */}
      {heroImage && (
        <div className="wp-pattern-hero__background">
          <img
            ref={imageRef}
            src={heroImage}
            alt=""
            className="wp-pattern-hero__background-image"
          />
          <div
            className={cn("wp-pattern-hero__overlay", `wp-pattern-hero__overlay--${overlay}`)}
          />
        </div>
      )}

      {/* Content */}
      <Container className="wp-pattern-hero__content">
        <div className="wp-pattern-hero__inner wp-pattern-hero__inner--split">
          <div className="wp-pattern-hero__main">
            {/* Badge / Chip */}
            {badge && (
              <motion.div
                initial={animated ? { opacity: 0, y: -10 } : undefined}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="wp-pattern-hero__badges"
              >
                <span className="wp-pattern-hero__badge">
                  {BadgeIcon && <BadgeIcon className="wp-pattern-hero__badge-icon" />}
                  {badge.label}
                </span>
              </motion.div>
            )}

            {/* Title */}
            {title && (
              <motion.h1
                initial={animated ? { opacity: 0, y: 30 } : undefined}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="wp-pattern-hero__title"
              >
                {title}
              </motion.h1>
            )}

            {/* Description */}
            {displayIntro && (
              <motion.p
                initial={animated ? { opacity: 0, y: 20 } : undefined}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="wp-pattern-hero__intro"
              >
                {displayIntro}
              </motion.p>
            )}

            {/* Buttons */}
            {(primaryCTA || secondaryCTA) && (
              <motion.div
                initial={animated ? { opacity: 0, y: 20 } : undefined}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="wp-pattern-hero__actions"
              >
                {primaryCTA && (
                  <button
                    onClick={handleNav(primaryCTA.href, primaryCTA.onClick)}
                    className="wp-pattern-hero__button-primary"
                  >
                    {primaryCTA.label}
                    {primaryCTA.icon
                      ? <primaryCTA.icon className="wp-pattern-hero__button-icon" />
                      : null}
                  </button>
                )}

                {secondaryCTA && (
                  <button
                    onClick={handleNav(secondaryCTA.href, secondaryCTA.onClick)}
                    className={cn(
                      "wp-pattern-hero__button-secondary",
                      secondaryCTA.variant === "ghost" &&
                        "wp-pattern-hero__button-secondary--ghost",
                    )}
                  >
                    {secondaryCTA.label}
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </Container>

      {/* Scroll-Down Arrow */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="wp-pattern-hero__scroll"
        >
          <ScrollDownArrow />
        </motion.div>
      )}
    </section>
  );
}

export default Hero;