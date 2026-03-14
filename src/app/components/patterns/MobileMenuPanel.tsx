/**
 * Mobile Menu Panel Pattern
 * 
 * Full-screen mobile navigation overlay with modern, world-class design.
 * Features logo, CTA, theme toggle, search, and smooth animations.
 * 
 * **WordPress Pattern Category:** Navigation
 * **Pattern Slug:** lightspeed/mobile-menu-panel
 * 
 * **Features:**
 * - Full-screen overlay (100% width & height)
 * - Modern visual hierarchy
 * - Logo branding
 * - Attractive close button (top-right corner)
 * - Primary CTA button
 * - Theme toggle (light/dark mode)
 * - Search form (expandable)
 * - Contact quick links
 * - Smooth animations & transitions
 * - Body scroll lock
 * 
 * **Design System Compliance:**
 * - Typography: Lora (headings), Noto Sans (body)
 * - Colors: Semantic tokens only (`bg-background`, `text-foreground`, `text-primary`)
 * - Spacing: Tailwind scale + fluid spacing
 * - Transitions: Smooth CSS animations
 * - Z-Index: 100
 * 
 * @module MobileMenuPanel
 * @category patterns
 */

import { useState, useEffect } from "react";
import { CaretDown as ChevronDown, X, MagnifyingGlass as Search, Phone, EnvelopeSimple as Mail, MapPin, Sun, Moon } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { SiteLogo } from "../blocks/theme/SiteLogo";
import { Button } from "../blocks/design/Button";
import { SITE_CONFIG } from "../../data/site-config";
import { CONTACT_INFO } from "../../data/content/navigation";

/**
 * Menu item interface.
 */
export interface MenuItem {
  id: string;
  title: string;
  url: string;
  isActive?: boolean;
  children?: MenuItem[];
}

/**
 * Props for the MobileMenuPanel pattern.
 */
interface MobileMenuPanelProps {
  /** Whether the panel is visible */
  isOpen: boolean;
  /** Callback when panel should close */
  onClose: () => void;
  /** Menu items to display */
  menu: MenuItem[];
  /** Current theme (light or dark) */
  theme?: 'light' | 'dark';
  /** Callback when theme toggle is clicked */
  onThemeToggle?: () => void;
  /** Callback when CTA is clicked */
  onCTAClick?: () => void;
  /** Callback when navigation link is clicked */
  onNavigate?: (pageId: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Mobile Menu Panel Pattern.
 * 
 * World-class full-screen mobile navigation with modern design.
 * 
 * @component
 * @category patterns
 */
export function MobileMenuPanel({
  isOpen,
  onClose,
  menu,
  theme = 'light',
  onThemeToggle,
  onCTAClick,
  onNavigate,
  className,
}: MobileMenuPanelProps) {
  const [openSubMenus, setOpenSubMenus] = useState<Set<string>>(new Set());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsSearchOpen(false);
      setSearchQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        } else {
          handleClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isSearchOpen]);

  // Close and reset state
  const handleClose = () => {
    onClose();
    setOpenSubMenus(new Set());
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Toggle submenu
  const toggleSubMenu = (itemId: string) => {
    setOpenSubMenus(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery);
      // Implement search functionality
      handleClose();
    }
  };

  // Handle CTA click
  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick();
    }
    handleClose();
  };

  // Render nav item
  const renderNavItem = (item: MenuItem, level: number = 0) => {
    const hasSubMenu = item.children && item.children.length > 0;
    const isSubmenuOpen = openSubMenus.has(item.id);

    return (
      <li key={item.id}>
        <div className="flex items-center justify-between gap-fluid-sm">
          {/* Menu link */}
          <a
            href={item.url}
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              onNavigate?.(item.url);
            }}
            className={cn(
              "flex-1 py-element-md px-element-lg rounded-[var(--radius-md)]",
              "cursor-pointer",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              // Active state
              item.isActive 
                ? "wp-bg-primary-light font-[var(--font-weight-medium)]" 
                : "text-foreground hover:bg-muted",
              // Level-based size
              level === 0 ? "text-[length:var(--text-lg)]" : "text-[length:var(--text-base)] pl-element-xl"
            )}
            aria-current={item.isActive ? 'page' : undefined}
          >
            {item.title}
          </a>
          
          {/* Submenu toggle */}
          {hasSubMenu && (
            <button
              onClick={() => toggleSubMenu(item.id)}
              aria-expanded={isSubmenuOpen}
              aria-haspopup="true"
              aria-label={`Toggle ${item.title} submenu`}
              className={cn(
                "p-element-sm rounded-[var(--radius-md)]",
                "hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "transition-all duration-200"
              )}
            >
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isSubmenuOpen && "rotate-180"
                )}
              />
            </button>
          )}
        </div>

        {/* Submenu */}
        {hasSubMenu && isSubmenuOpen && (
          <ul className="flex flex-col gap-fluid-xs m-0 p-0 pt-fluid-sm">
            {item.children!.map((child) => renderNavItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  // Don't render if closed
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "mobile-menu-panel",
        "fixed inset-0 z-[100]",
        "bg-background",
        "overflow-hidden",
        "animate-in fade-in duration-300",
        className
      )}
    >
      {/* Header: Logo + Close Button */}
      <header className="flex items-center justify-between p-element-xl border-b border-border">
        {/* Logo */}
        <div className="flex items-center gap-fluid-md">
          <SiteLogo width="180px" />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close menu"
          className={cn(
            "p-element-sm rounded-[var(--radius-full)]",
            "bg-muted hover:bg-muted/80",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "transition-all duration-200",
            "hover:scale-110 active:scale-95"
          )}
        >
          <X className="h-6 w-6" />
        </button>
      </header>

      {/* Scrollable Content */}
      <div className="overflow-y-auto h-[calc(100vh-80px)]">
        {/* Search Bar */}
        <div className="p-element-xl border-b border-border">
          {!isSearchOpen ? (
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                "w-full flex items-center gap-fluid-md p-element-lg rounded-[var(--radius-lg)]",
                "bg-muted hover:bg-muted/80",
                "text-muted-foreground",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <Search className="h-5 w-5" />
              <span>Search tours, destinations...</span>
            </button>
          ) : (
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-[var(--spacing-element-lg)] top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tours, destinations..."
                autoFocus
                className={cn(
                  "w-full pl-element-3xl pr-element-3xl py-element-lg rounded-[var(--radius-lg)]",
                  "bg-muted border-2 border-primary",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "transition-all duration-200"
                )}
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-[var(--spacing-element-lg)] top-1/2 -translate-y-1/2 p-element-xs hover:bg-background rounded-[var(--radius-md)]"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
          )}
        </div>

        {/* Primary CTA */}
        <div className="p-element-xl border-b border-border">
          <Button
            onClick={handleCTAClick}
            size="lg"
            className="w-full text-[length:var(--text-lg)] py-element-xl"
          >
            <Phone className="h-5 w-5" />
            Request a Quote
          </Button>
        </div>

        {/* Theme Toggle */}
        <div className="p-element-xl border-b border-border">
          <button
            onClick={onThemeToggle}
            className={cn(
              "w-full flex items-center justify-between p-element-lg rounded-[var(--radius-lg)]",
              "bg-muted hover:bg-muted/80",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="Toggle theme"
          >
            <span className="flex items-center gap-fluid-md">
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-accent" />
              ) : (
                <Moon className="h-5 w-5 text-info" />
              )}
              <span className="font-[var(--font-weight-medium)]">
                {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </span>
            <ChevronDown className="h-5 w-5 -rotate-90" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-element-xl" role="navigation" aria-label="Main navigation">
          <h2 className="sr-only">Main Menu</h2>
          <ul className="flex flex-col gap-fluid-sm list-none">
            {menu.map((item) => renderNavItem(item))}
          </ul>
        </nav>

        {/* Quick Contact Links */}
        <div className="p-element-xl border-t border-[color:var(--color-border)] bg-[color:var(--color-muted)]/30 flex flex-col gap-element-md">
          <h3 className="font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)] m-0">Get in Touch</h3>
          <div className="flex flex-col gap-fluid-md">
            {/* Phone */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className={cn(
                "flex items-center gap-fluid-md p-element-sm rounded-[var(--radius-lg)]",
                "hover:bg-background",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <Phone className="h-5 w-5 text-primary" />
              <span>{CONTACT_INFO.phone}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className={cn(
                "flex items-center gap-fluid-md p-element-sm rounded-[var(--radius-lg)]",
                "hover:bg-background",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <Mail className="h-5 w-5 text-primary" />
              <span>{CONTACT_INFO.email}</span>
            </a>

            {/* Address */}
            <div
              className={cn(
                "flex items-center gap-fluid-md p-element-sm rounded-[var(--radius-lg)]",
                "text-foreground"
              )}
            >
              <MapPin className="h-5 w-5 text-primary" />
              <span>{CONTACT_INFO.address}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-element-xl text-center text-[length:var(--text-sm)] text-muted-foreground">
          <p className="m-0">© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}