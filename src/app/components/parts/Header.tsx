/**
 * Site Header — WordPress Template Part
 *
 * Premium navigation experience with mega menu dropdowns and theme control.
 * Consumes navigation data from the centralized data file
 * (`/src/app/data/content/navigation.ts`) — no hardcoded links.
 *
 * WordPress Mapping: parts/header.html
 * CSS: /src/styles/parts/header.css (BEM: .wp-part-header__*)
 *
 * @module Header
 * @category parts
 */

import {
  List, X, Sun, Moon, Compass, ShieldCheck, Envelope, ArrowRight, Globe, CaretDown
} from "@phosphor-icons/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Logo } from "../common/Logo";
import { Container } from "../common/Container";
import { cn } from "../../lib/utils";
import { motion as Motion, AnimatePresence } from "motion/react";
import { useTheme } from "../../contexts/ThemeContext";
import { PRIMARY_NAV, HEADER_CTA } from "../../data/content/navigation";
import { MegaMenu } from "./MegaMenu";

/* IDs of nav items that have mega menus */
const MEGA_MENU_IDS = ["nav-tours", "nav-destinations", "nav-accommodation", "nav-blog", "nav-sustainability", "nav-about"];

export function Header({ currentPage = "/", onNavigate }: { currentPage?: string; onNavigate?: (path: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (path: string) => {
    onNavigate?.(path);
    setMobileMenuOpen(false);
    setActiveMega(null);
  };

  /* Mega menu hover handlers with debounce to prevent flicker */
  const openMega = useCallback((id: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveMega(id);
  }, []);

  const closeMega = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  return (
    <>
      <header className={cn("wp-part-header", isScrolled && "wp-part-header--scrolled")}>
        <div className="wp-part-header__inner">
          <div className="wp-part-header__bar">
            {/* Brand Section */}
            <div className="wp-part-header__logo">
              <Logo
                size="sm"
                onClick={() => handleNav("/")}
                className="cursor-pointer"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="wp-part-header__nav" aria-label="Primary Navigation">
              <ul className="wp-part-header__nav-list">
                {PRIMARY_NAV.map(link => {
                  const hasMega = MEGA_MENU_IDS.includes(link.id);
                  return (
                    <li
                      key={link.id}
                      className="wp-part-header__nav-item"
                      onMouseEnter={hasMega ? () => openMega(link.id) : undefined}
                      onMouseLeave={hasMega ? closeMega : undefined}
                    >
                      <button
                        onClick={() => {
                          if (hasMega) {
                            setActiveMega(activeMega === link.id ? null : link.id);
                          } else {
                            handleNav(link.href);
                          }
                        }}
                        className={cn(
                          "wp-part-header__nav-link",
                          currentPage === link.href && "wp-part-header__nav-link--active",
                          activeMega === link.id && "wp-part-header__nav-link--active"
                        )}
                        aria-expanded={hasMega ? activeMega === link.id : undefined}
                        aria-haspopup={hasMega ? "true" : undefined}
                      >
                        {link.label}
                        {hasMega && (
                          <CaretDown
                            className={cn(
                              "wp-part-mega-menu__link-icon",
                              "transition-transform",
                              activeMega === link.id && "rotate-180"
                            )}
                            weight="bold"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Action Cluster */}
            <div className="wp-part-header__actions">
              <button
                onClick={toggleTheme}
                className="wp-part-header__theme-toggle"
                aria-label="Toggle Atmosphere"
              >
                {theme === "light" ? <Moon /> : <Sun />}
              </button>

              <button
                onClick={() => handleNav(HEADER_CTA.href)}
                className="wp-part-header__search-button hidden md:flex items-center gap-fluid-sm"
              >
                <Compass className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" /> {HEADER_CTA.label}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="wp-part-header__mobile-toggle"
                aria-label="Open mobile menu"
              >
                <List />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Panels */}
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={closeMega}
        >
          <MegaMenu
            activeMenu={activeMega}
            onNavigate={handleNav}
            onClose={() => setActiveMega(null)}
          />
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="wp-part-header__mobile-overlay"
          >
            <Container className="wp-part-header__mobile-overlay-inner">
              <div className="wp-part-header__mobile-overlay-header">
                <Logo size="sm" bare className="h-8 cursor-pointer" onClick={() => handleNav("/")} />
                <button onClick={() => setMobileMenuOpen(false)} className="wp-part-header__mobile-overlay-close">
                  <X className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" />
                </button>
              </div>

              <nav className="wp-part-header__mobile-overlay-nav">
                {PRIMARY_NAV.map((link, idx) => (
                  <Motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={link.id}
                    onClick={() => handleNav(link.href)}
                    className="wp-part-header__mobile-overlay-link group"
                  >
                    <span className="wp-part-header__mobile-overlay-link-text">{link.label}</span>
                    <ArrowRight className="wp-part-header__mobile-overlay-link-icon" />
                  </Motion.button>
                ))}
              </nav>

              <div className="wp-part-header__mobile-overlay-footer">
                <button
                  onClick={() => handleNav("/trip-planner")}
                  className="wp-part-header__mobile-overlay-cta"
                >
                  Start Trip Planner
                </button>
                <div className="wp-part-header__mobile-overlay-social">
                  <button onClick={() => handleNav("/destinations")} aria-label="Destinations" className="wp-part-header__mobile-overlay-social-link">
                    <Globe className="size-5" />
                  </button>
                  <button onClick={() => handleNav("/about")} aria-label="About Us" className="wp-part-header__mobile-overlay-social-link">
                    <ShieldCheck className="size-5" />
                  </button>
                  <button onClick={() => handleNav("/contact")} aria-label="Contact Us" className="wp-part-header__mobile-overlay-social-link">
                    <Envelope className="size-5" />
                  </button>
                </div>
              </div>
            </Container>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;