/**
 * Template-Part Data Schemas
 *
 * Defines the canonical shapes for all data consumed by the shared
 * template-part components: Header, Footer, MobileMenu, Breadcrumbs.
 *
 * These interfaces act as the "contract" between data files
 * (`/src/app/data/content/navigation.ts`) and the React components
 * that render them. If the data file or the component changes,
 * TypeScript will surface mismatches at compile time.
 *
 * WordPress Mapping:
 *   NavItem          → single `core/navigation-link` block
 *   NavSection       → grouped navigation column (footer)
 *   SocialLink       → `core/social-link` block
 *   ContactInfo      → site-options / customizer fields
 *   BreadcrumbItem   → single breadcrumb segment
 *   BreadcrumbTrail  → full breadcrumb path keyed by context
 *   HeroContent      → re-exported from common.ts for convenience
 *
 * @module template-parts-types
 * @category data/types
 */

/* ================================================================
   NAVIGATION
   ================================================================ */

/** A single navigation link. */
export interface NavItem {
  /** Unique stable ID (for keys and tracking). */
  id: string;
  /** Display label. */
  label: string;
  /** Target path (relative) or URL (absolute). */
  href: string;
  /** Optional Phosphor icon name. */
  icon?: string;
  /** Optional badge text (e.g. "New", "Impact"). */
  badge?: string;
  /** Optional short description (used in mega-menus). */
  description?: string;
  /** Child items (one level of nesting for mega-menus). */
  children?: NavItem[];
}

/** A labelled group of navigation links (footer columns, mobile sections). */
export interface NavSection {
  /** Unique stable ID. */
  id: string;
  /** Column / section heading. */
  heading: string;
  /** Links in this section. */
  items: NavItem[];
}

/* ================================================================
   SOCIAL LINKS
   ================================================================ */

/** Supported social platform identifiers. */
export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "pinterest";

/** A single social media link. */
export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  label: string;
}

/* ================================================================
   CONTACT INFO
   ================================================================ */

/** Site-wide contact details. */
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

/* ================================================================
   BREADCRUMBS
   ================================================================ */

/** A single breadcrumb segment. */
export interface BreadcrumbItem {
  /** Display text. */
  label: string;
  /** Link path. Omit for the current (last) item. */
  href?: string;
}

/** A full breadcrumb trail keyed by page context. */
export interface BreadcrumbTrail {
  /** Page context key (matches Hero context). */
  context: string;
  /** Ordered breadcrumb segments (Home → ... → Current). */
  items: BreadcrumbItem[];
}
