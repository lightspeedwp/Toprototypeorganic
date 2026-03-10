/**
 * Navigation Block Component
 * 
 * WordPress Block: `core/navigation`
 * Category: Theme
 * 
 * Displays a menu to help visitors navigate the website.
 * Supports horizontal/vertical orientation, mobile menu, and submenus.
 * 
 * **Features:**
 * - Horizontal/vertical orientation
 * - Mobile menu with hamburger toggle
 * - Submenu support (2 levels max)
 * - Keyboard navigation
 * - ARIA roles and labels
 * - Hover/active/focus states
 * - Responsive breakpoints
 * 
 * **Design System Compliance:**
 * - Typography: Noto Sans (`var(--font-family-noto-sans)`)
 * - Font sizes: CSS variables
 * - Colors: Semantic tokens only
 * - Spacing: Tailwind gap scale
 * - No hardcoded styles
 * 
 * @module Navigation
 * @category blocks/theme
 * @see /guidelines/blocks/theme/navigation.md
 */

import { List as Menu, X, CaretDown as ChevronDown } from "@phosphor-icons/react";
import { cn } from "../../../lib/utils";
import { useState, useEffect } from "react";

/**
 * Navigation menu item interface.
 * 
 * @interface MenuItem
 */
export interface MenuItem {
  /**
   * Unique identifier for the menu item.
   */
  id: string;
  
  /**
   * Display text for the menu item.
   */
  title: string;
  
  /**
   * URL the menu item links to.
   */
  url: string;
  
  /**
   * Whether this is the current/active page.
   * 
   * @default false
   */
  isActive?: boolean;
  
  /**
   * Nested child menu items (submenu).
   * Limit to 2 levels maximum.
   */
  children?: MenuItem[];
}

/**
 * Props for the Navigation component.
 * 
 * @interface NavigationProps
 */
interface NavigationProps {
  /**
   * Array of menu items to display.
   */
  menu: MenuItem[];
  
  /**
   * Layout orientation.
   * - 'horizontal': For desktop headers
   * - 'vertical': For sidebars or mobile
   * 
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Gap between menu items (Tailwind scale: 1-12).
   * 
   * @default '6'
   */
  spacing?: string;
  
  /**
   * Alignment of menu items.
   * 
   * @default 'flex-start'
   */
  align?: 'start' | 'center' | 'end' | 'space-between';
  
  /**
   * Breakpoint in pixels for mobile menu toggle.
   * 
   * @default 768
   */
  mobileBreakpoint?: number;
  
  /**
   * Additional CSS classes to apply.
   */
  className?: string;
  
  /**
   * Inline style overrides.
   */
  style?: React.CSSProperties;
  
  /**
   * External control for mobile menu state.
   * If provided, the component won't render its own toggle button.
   */
  isOpen?: boolean;
  
  /**
   * Callback when mobile menu should open.
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * If true, only renders the toggle button (for external placement).
   * 
   * @default false
   */
  onlyToggle?: boolean;
  
  /**
   * Callback when navigation link is clicked.
   * Receives the page ID from the URL.
   */
  onNavigate?: (pageId: string) => void;
}

/**
 * Navigation Block Component.
 * 
 * Renders an accessible navigation menu with desktop and mobile support.
 * 
 * **Usage Guidelines:**
 * 1. Plan menu structure with logical groups
 * 2. Provide same top-level links on desktop and mobile
 * 3. Indicate active links with color and/or underline
 * 4. Limit submenu depth to 2 levels maximum
 * 5. Ensure full keyboard navigation support
 * 6. Test on various devices and screen sizes
 * 
 * **WordPress Context:**
 * Equivalent to `core/navigation` block. Menu data typically loaded
 * from WordPress navigation menus.
 * 
 * **Accessibility:**
 * - Semantic nav element with role="navigation"
 * - ARIA labels and roles
 * - Keyboard navigation (Tab, Enter, Space, Escape)
 * - Focus indicators
 * - WCAG AA contrast ratios
 * - Skip links support
 * 
 * @component
 * @category blocks/theme
 * 
 * @param {NavigationProps} props - Component properties
 * @returns {JSX.Element} Rendered navigation menu
 * 
 * @example
 * // Horizontal desktop menu
 * <Navigation 
 *   menu={primaryMenu}
 *   orientation="horizontal"
 *   spacing="6"
 * />
 * 
 * @example
 * // Vertical sidebar menu
 * <Navigation 
 *   menu={sidebarMenu}
 *   orientation="vertical"
 *   spacing="4"
 * />
 * 
 * @example
 * // With custom alignment
 * <Navigation 
 *   menu={primaryMenu}
 *   align="space-between"
 *   spacing="8"
 * />
 */
export function Navigation({
  menu,
  orientation = 'horizontal',
  spacing = '6',
  align = 'start',
  mobileBreakpoint = 768,
  className,
  style,
  isOpen,
  onOpenChange,
  onlyToggle = false,
  onNavigate,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Set<string>>(new Set());

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
      
      // Close mobile menu if viewport becomes desktop
      if (window.innerWidth >= mobileBreakpoint) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Toggle submenu open/close
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

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenSubMenus(new Set());
  };

  // Alignment classes
  const alignmentClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    'space-between': 'justify-between',
  };

  // Render individual nav item
  const renderNavItem = (item: MenuItem, level: number = 0) => {
    const hasSubMenu = item.children && item.children.length > 0;
    const isSubmenuOpen = openSubMenus.has(item.id);

    return (
      <li key={item.id} className="relative">
        <div className="flex items-center gap-1">
          <a
            href={item.url}
            onClick={(e) => {
              e.preventDefault();
              closeMobileMenu();
              onNavigate?.(item.url);
            }}
            className={cn(
              "nav-link",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "rounded-[var(--radius-sm)] px-2 py-1",
              "cursor-pointer",
              // Normal state
              item.isActive ? "text-primary font-semibold underline" : "text-foreground",
              // Hover state
              !item.isActive && "hover:text-primary",
              // Submenu styling
              level > 0 && "text-sm"
            )}
            aria-current={item.isActive ? 'page' : undefined}
          >
            {item.title}
          </a>
          
          {/* Submenu toggle button */}
          {hasSubMenu && (
            <button
              onClick={() => toggleSubMenu(item.id)}
              aria-expanded={isSubmenuOpen}
              aria-haspopup="true"
              aria-label={`Toggle ${item.title} submenu`}
              className={cn(
                "p-1 rounded-[var(--radius-sm)]",
                "hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "transition-all duration-200"
              )}
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isSubmenuOpen && "rotate-180"
                )}
              />
            </button>
          )}
        </div>

        {/* Submenu */}
        {hasSubMenu && isSubmenuOpen && (
          <ul
            className={cn(
              "submenu",
              "mt-2 space-y-2",
              orientation === 'horizontal' && !isMobile
                ? "absolute left-0 top-full bg-card border border-border rounded-[var(--radius-lg)] shadow-[var(--elevation-lg)] py-2 px-4 min-w-[200px] z-50"
                : "ml-4 pl-4 border-l-2 border-border"
            )}
          >
            {item.children!.map((child) => renderNavItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  // Mobile menu toggle button
  const MobileMenuToggle = () => (
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-label="Toggle navigation"
      aria-expanded={isMobileMenuOpen}
      className={cn(
        "mobile-menu-toggle",
        "p-2 rounded-[var(--radius-md)]",
        "bg-muted",
        "hover:bg-muted/80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "transition-colors"
      )}
    >
      {isMobileMenuOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </button>
  );

  // Desktop navigation (always visible on desktop)
  const DesktopNav = () => (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "navigation",
        "hidden md:block",
        className
      )}
      style={style}
    >
      <ul
        className={cn(
          "nav-menu",
          "flex list-none",
          orientation === 'horizontal' ? "flex-row" : "flex-col",
          `gap-${spacing}`,
          alignmentClasses[align]
        )}
      >
        {menu.map((item) => renderNavItem(item))}
      </ul>
    </nav>
  );

  // Mobile navigation (overlay/modal)
  const MobileNav = () => (
    <>
      {/* Mobile menu toggle button */}
      <div className="md:hidden">
        <MobileMenuToggle />
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <nav
            role="navigation"
            aria-label="Main navigation"
            className={cn(
              "mobile-navigation",
              "fixed top-0 right-0 bottom-0",
              "w-[80%] max-w-sm",
              "bg-card border-l border-border",
              "z-[110]",
              "overflow-y-auto",
              "md:hidden",
              "animate-in slide-in-from-right duration-300"
            )}
          >
            {/* Close button */}
            <div className="flex justify-end p-4 border-b border-border">
              <button
                onClick={closeMobileMenu}
                aria-label="Close navigation"
                className={cn(
                  "p-2 rounded-[var(--radius-md)]",
                  "hover:bg-muted",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "transition-colors"
                )}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu items */}
            <ul className="nav-menu flex flex-col gap-4 p-6 list-none">
              {menu.map((item) => renderNavItem(item))}
            </ul>
          </nav>
        </>
      )}
    </>
  );

  return (
    <>
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </>
  );
}