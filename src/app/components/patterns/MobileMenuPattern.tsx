/**
 * Mobile Menu Pattern - Below-Header Navigation Panel
 * 
 * A full-screen mobile navigation pattern that opens directly below
 * the sticky site header. The header's burger icon (Menu/X) controls
 * open/close — this component contains NO duplicate header or close button.
 * 
 * **Pattern Type:** Navigation / Mobile Menu
 * **WordPress Mapping:** Pattern for mobile navigation overlay
 * 
 * **Features:**
 * - Opens below the sticky header (not full-screen overlay)
 * - Slide-down animation with backdrop blur
 * - Integrated search bar at top
 * - Large touch-friendly navigation (48px+ height)
 * - Expandable accordion sections for submenus
 * - Enquire Now CTA footer
 * - Smooth 300ms animations
 * 
 * **Design System Compliance:**
 * - Typography: Lora (section headings), Noto Sans (links, body)
 * - Colors: All from CSS variables (semantic tokens)
 * - Spacing: Design system rhythm (gap-fluid-md, p-[var(--spacing-element-xl)], etc.)
 * - Effects: Border radius, shadows, transitions from theme.css
 * - Dark mode: Automatic via CSS custom properties
 * 
 * **Accessibility:**
 * - WCAG 2.1 AA compliant
 * - Keyboard navigation (Tab, Escape, Enter)
 * - Focus indicators on all interactive elements
 * - Touch targets minimum 44px × 44px
 * - ARIA labels and states
 * 
 * @module MobileMenuPattern
 * @category patterns
 * @wordpressPattern mobile-menu
 */

import { 
  MagnifyingGlass as Search, 
  CaretDown as ChevronDown, 
  EnvelopeSimple as Mail,
  Phone,
  ArrowRight
} from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

/**
 * Mobile menu link item interface.
 */
export interface MobileMenuItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  description?: string;
}

/**
 * Mobile menu section interface (for expandable sections).
 */
export interface MobileMenuSection {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  children?: MobileMenuItem[];
}

/**
 * Props for the MobileMenuPattern component.
 */
interface MobileMenuPatternProps {
  /** Whether the mobile menu is open */
  isOpen: boolean;
  /** Callback when menu should close */
  onClose: () => void;
  /** Menu sections with expandable children */
  sections: MobileMenuSection[];
  /** Current active page ID */
  currentPage?: string;
  /** Current theme (light or dark) */
  theme: "light" | "dark";
  /** Callback when theme toggle is clicked */
  onThemeToggle: () => void;
  /** Callback when navigation link is clicked */
  onNavigate: (pageId: string) => void;
  /** Search query state */
  searchQuery: string;
  /** Callback when search query changes */
  onSearchChange: (query: string) => void;
  /** Callback when search is submitted */
  onSearchSubmit: () => void;
}

/**
 * Mobile Menu Pattern Component.
 * 
 * Navigation panel that appears directly below the sticky site header.
 * The header's burger button controls open/close state — no duplicate
 * close button is rendered here.
 * 
 * **Layout Structure:**
 * ```
 * <Backdrop> (below header, click-to-close)
 * <Panel> (below header, slides down)
 *   <Search Bar>
 *   <Navigation> (scrollable)
 *     <Section 1> (expandable)
 *       <Submenu Items>
 *     <Section 2> (expandable)
 *     ...
 *   </Navigation>
 *   <Footer CTA>
 * </Panel>
 * ```
 * 
 * @component
 * @category patterns
 */
export function MobileMenuPattern({
  isOpen,
  onClose,
  sections,
  currentPage,
  theme,
  onThemeToggle,
  onNavigate,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: MobileMenuPatternProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * Toggle section expansion.
   */
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  /**
   * Handle navigation click - close menu and navigate.
   */
  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  /**
   * Handle search submit.
   */
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      onSearchSubmit();
      onClose();
    }
  };

  /**
   * Close menu on Escape key.
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  /**
   * Prevent body scroll when menu is open.
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /**
   * Reset expanded sections when menu closes.
   */
  useEffect(() => {
    if (!isOpen) {
      setExpandedSections([]);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — starts below header, click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-backdrop bg-background/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — positioned below header via .mobile-menu-panel CSS class */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
              "mobile-menu-panel",
              "bg-card border-t border-border",
              "shadow-[var(--elevation-lg)]"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Search Bar */}
            <div className="px-element-lg py-element-md border-b border-border bg-background">
              <div className="relative">
                <Search size={20} className="absolute right-[var(--spacing-element-md)] top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchSubmit();
                  }}
                  placeholder="Search tours, destinations..."
                  className={cn(
                    "w-full pl-element-lg pr-element-3xl py-element-md rounded-[var(--radius-md)]",
                    "wp-bg-accent-medium border border-border",
                    "text-foreground placeholder:text-muted-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:bg-accent",
                    "transition-all duration-200"
                  )}
                  aria-label="Search"
                />
              </div>
            </div>

            {/* Navigation — Scrollable */}
            <nav className="flex-1 overflow-y-auto px-element-lg py-element-md flex flex-col gap-1" aria-label="Mobile navigation">
              {sections.map((section) => (
                <div key={section.id}>
                  {/* Section Header — Always visible */}
                  <button
                    onClick={() => {
                      if (section.children && section.children.length > 0) {
                        toggleSection(section.id);
                      } else {
                        handleNavClick(section.href);
                      }
                    }}
                    className={cn(
                      "w-full flex items-center justify-between",
                      "px-element-lg py-element-md rounded-[var(--radius-md)]",
                      "text-left transition-all duration-200",
                      "text-foreground hover:bg-accent",
                      currentPage === section.href && "bg-accent",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                      "min-h-[48px]"
                    )}
                  >
                    <span className="flex items-center gap-fluid-md">
                      {section.icon && <section.icon size={20} className="text-primary" />}
                      <span>{section.label}</span>
                    </span>
                    
                    {section.children && section.children.length > 0 && (
                      <ChevronDown
                        size={20}
                        className={cn(
                          "text-muted-foreground transition-transform duration-200",
                          expandedSections.includes(section.id) && "rotate-180"
                        )}
                      />
                    )}
                  </button>

                  {/* Expandable Submenu */}
                  <AnimatePresence>
                    {section.children && expandedSections.includes(section.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-element-xs flex flex-col gap-0.5 pl-element-lg border-l-2 border-[color:var(--color-border)] relative left-[var(--spacing-element-lg)] w-[calc(100%-var(--spacing-element-lg))]">
                          {section.children.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => handleNavClick(item.href)}
                              className={cn(
                                "w-full text-left px-element-lg py-element-md rounded-[var(--radius-md)]",
                                "transition-all duration-200",
                                "text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)] wp-bg-accent-hover font-[family:var(--font-family-noto-sans)]",
                                "flex items-center gap-fluid-md",
                                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                                "min-h-[44px]"
                              )}
                            >
                              {item.icon && <item.icon size={18} className="text-[color:var(--color-primary)] flex-shrink-0" />}
                              <div className="flex-1 flex flex-col gap-element-xs">
                                <div className="flex items-center gap-fluid-sm">
                                  <span>{item.label}</span>
                                  {item.badge && (
                                    <span className="wp-badge-primary-sm rounded-[var(--radius-full)]">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                {item.description && (
                                  <p className="text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] m-0">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Footer CTA — Enquire Now */}
            <div className={cn(
              "px-element-lg py-element-lg border-t border-[color:var(--color-border)]",
              "bg-[color:var(--color-background)] flex flex-col gap-element-md"
            )}>
              <button
                onClick={() => {
                  handleNavClick("/contact");
                }}
                className={cn(
                  "w-full px-element-2xl py-element-md rounded-[var(--radius-md)]",
                  "bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)]",
                  "hover:bg-[color:var(--color-primary)]/90",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "transition-all duration-200",
                  "flex items-center justify-center gap-fluid-sm",
                  "min-h-[48px]",
                  "shadow-[var(--elevation-sm)] hover:shadow-[var(--elevation-md)]"
                )}
                aria-label="Enquire now"
              >
                <Mail size={18} />
                <span>Enquire Now</span>
                <ArrowRight size={18} />
              </button>
              
              {/* Quick Contact Info */}
              <div className="flex items-center justify-center gap-fluid-xl text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)]">
                <a
                  href="tel:+27000000000"
                  className="flex items-center gap-fluid-sm hover:text-[color:var(--color-foreground)] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Phone size={14} />
                  <span>Call Us</span>
                </a>
                <span className="text-[color:var(--color-border)]">|</span>
                <a
                  href="mailto:info@lightspeedtours.com"
                  className="flex items-center gap-fluid-sm hover:text-[color:var(--color-foreground)] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Mail size={14} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}