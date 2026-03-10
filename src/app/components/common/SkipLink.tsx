/**
 * Skip Link Component
 * 
 * Provides keyboard users with a way to skip repetitive navigation
 * and jump directly to main content. Essential for WCAG 2.1 Level A.
 * 
 * **WCAG Criteria:**
 * - 2.4.1 Bypass Blocks (Level A)
 * - 2.1.1 Keyboard (Level A)
 * 
 * **Features:**
 * - Only visible on keyboard focus
 * - Smooth scroll to target
 * - High contrast for visibility
 * - Positioned at top of page
 * - Semantic HTML
 * 
 * @module SkipLink
 * @category common
 */

import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface SkipLinkProps {
  /** Target element ID (without #) */
  targetId: string;
  /** Link text */
  children: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Skip Link Component.
 * 
 * Renders an accessible skip link that's only visible when focused.
 * 
 * @component
 * @category common
 * 
 * @param {SkipLinkProps} props - Component props
 * @returns {JSX.Element} Skip link element
 * 
 * @example
 * <SkipLink targetId="main-content">
 *   Skip to main content
 * </SkipLink>
 * 
 * @accessibility
 * - Only visible on focus (reduces visual clutter)
 * - High contrast colors (WCAG AAA)
 * - Smooth scroll behavior
 * - Semantic anchor element
 */
export function SkipLink({ targetId, children, className }: SkipLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Handle click with smooth scroll
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    
    if (target) {
      // Smooth scroll to target
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Set focus to target (for screen readers)
      // Make target focusable if it isn't already
      const originalTabIndex = target.getAttribute('tabindex');
      if (!originalTabIndex) {
        target.setAttribute('tabindex', '-1');
      }
      
      target.focus();
      
      // Remove temporary tabindex after focus
      if (!originalTabIndex) {
        target.addEventListener('blur', () => {
          target.removeAttribute('tabindex');
        }, { once: true });
      }
    }
  };

  return (
    <a
      ref={linkRef}
      href={`#${targetId}`}
      onClick={handleClick}
      className={cn(
        // Positioning - absolute, top-left
        'absolute left-4 top-4 z-[9999]',
        
        // Styling - high contrast, visible only on focus
        'bg-primary text-primary-foreground',
        'px-6 py-3 rounded-lg',
        'font-medium',
        
        // Accessibility - skip link pattern (hidden until focused)
        'transform -translate-y-full opacity-0',
        'focus:translate-y-0 focus:opacity-100',
        
        // Focus styles - WCAG AAA compliant
        'focus:outline-none focus:ring-4 focus:ring-ring focus:ring-offset-2',
        
        // Transitions
        'transition-all duration-200',
        
        // Ensure it's above everything
        'shadow-lg',
        
        className
      )}
    >
      {children}
    </a>
  );
}

/**
 * Skip Links Container.
 * 
 * Renders multiple skip links for complex pages.
 * 
 * @component
 * @category common
 * 
 * @example
 * <SkipLinks>
 *   <SkipLink targetId="main-content">Skip to main content</SkipLink>
 *   <SkipLink targetId="navigation">Skip to navigation</SkipLink>
 *   <SkipLink targetId="footer">Skip to footer</SkipLink>
 * </SkipLinks>
 */
export function SkipLinks({ children }: { children: React.ReactNode }) {
  return (
    <div className="sr-only focus-within:not-sr-only" role="navigation" aria-label="Skip links">
      {children}
    </div>
  );
}
