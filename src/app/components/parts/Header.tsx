/**
 * Site Header — WordPress Template Part
 *
 * Premium navigation experience with theme control.
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
  List, X, Sun, Moon, Compass, ShieldCheck, Envelope, ArrowRight, Globe
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { Logo } from "../common/Logo";
import { Container } from "../common/Container";
import { cn } from "../../lib/utils";
import { motion as Motion, AnimatePresence } from "motion/react";
import { useTheme } from "../../contexts/ThemeContext";
import { PRIMARY_NAV, HEADER_CTA } from "../../data/content/navigation";

export function Header({ currentPage = "/", onNavigate }: { currentPage?: string; onNavigate?: (path: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (path: string) => {
    onNavigate?.(path);
    setMobileMenuOpen(false);
  };

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
                {PRIMARY_NAV.filter(link => link.id !== "nav-about").map(link => (
                  <li key={link.id} className="wp-part-header__nav-item">
                    <button
                      onClick={() => handleNav(link.href)}
                      className={cn(
                        "wp-part-header__nav-link",
                        currentPage === link.href && "wp-part-header__nav-link--active"
                      )}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
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
                className="wp-part-header__search-button hidden md:flex"
              >
                <Compass className="size-4" /> {HEADER_CTA.label}
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
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <Motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            <Container className="flex-1 flex flex-col py-8">
              <div className="flex items-center justify-between mb-16">
                <Logo size="sm" bare className="h-8 cursor-pointer" onClick={() => handleNav("/")} />
                <button onClick={() => setMobileMenuOpen(false)} className="size-12 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-accent hover:text-primary transition-colors">
                  <X className="size-6" />
                </button>
              </div>

              <nav className="flex-1 space-y-8">
                {PRIMARY_NAV.map((link, idx) => (
                  <Motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={link.id}
                    onClick={() => handleNav(link.href)}
                    className="w-full text-left flex items-center justify-between group"
                  >
                    <span className="text-fluid-4xl font-serif font-bold group-hover:text-primary transition-colors">{link.label}</span>
                    <ArrowRight className="size-6 text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </Motion.button>
                ))}
              </nav>

              <div className="mt-auto pt-12 border-t border-border/50">
                <button 
                  onClick={() => handleNav("/trip-planner")}
                  className="w-full py-4 organic-radius-md bg-primary text-primary-foreground font-bold text-fluid-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Start Trip Planner
                </button>
                <div className="flex justify-center gap-8 mt-12 text-muted-foreground">
                  <button onClick={() => handleNav("/destinations")} aria-label="Destinations" className="hover:text-primary transition-colors">
                    <Globe className="size-5" />
                  </button>
                  <button onClick={() => handleNav("/about")} aria-label="About Us" className="hover:text-primary transition-colors">
                    <ShieldCheck className="size-5" />
                  </button>
                  <button onClick={() => handleNav("/contact")} aria-label="Contact Us" className="hover:text-primary transition-colors">
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