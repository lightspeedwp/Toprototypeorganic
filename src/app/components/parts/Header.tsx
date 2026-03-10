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
      <header className={cn("wp-part-header fixed top-0 left-0 right-0 z-[50] transition-all duration-500", isScrolled
    ? "bg-background/80 backdrop-blur-xl border-b-2 border-border/50 shadow-xl"
    : "bg-transparent")}>
        <Container>
          <div className="flex items-center justify-between gap-12">
            {/* Brand Section */}
            <Logo 
              size="sm" 
              onClick={() => handleNav("/")}
              className="h-8 md:h-10 transition-transform duration-500 hover:scale-105 cursor-pointer relative z-10 block" 
            />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {PRIMARY_NAV.filter(link => link.id !== "nav-about").map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider transition-all relative py-2 group",
                    currentPage === link.href ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100",
                    currentPage === link.href && "scale-x-100"
                  )} />
                </button>
              ))}
            </nav>

            {/* Action Cluster */}
            <div className="flex items-center gap-4 md:gap-6 relative z-10">
              <button 
                onClick={toggleTheme}
                className="size-10 rounded-md bg-card border-2 border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm"
                aria-label="Toggle Atmosphere"
              >
                {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
              </button>

              <button 
                onClick={() => handleNav(HEADER_CTA.href)}
                className="hidden md:flex items-center gap-3 px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Compass className="size-4" /> {HEADER_CTA.label}
              </button>

              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden size-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center shadow-md"
              >
                <List className="size-5" />
              </button>
            </div>
          </div>
        </Container>
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
                <Logo size="sm" bare className="h-8" />
                <button onClick={() => setMobileMenuOpen(false)} className="size-12 rounded-lg bg-muted flex items-center justify-center">
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
                  className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-bold text-fluid-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
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