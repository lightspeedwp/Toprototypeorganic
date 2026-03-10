/**
 * Focus Trap Component
 * 
 * Traps keyboard focus within a container, essential for accessible
 * modals, dialogs, and overlays. Meets WCAG 2.1 Level A requirements.
 * 
 * **WCAG Criteria:**
 * - 2.1.2 No Keyboard Trap (Level A)
 * - 2.4.3 Focus Order (Level A)
 * 
 * **Features:**
 * - Traps Tab/Shift+Tab within container
 * - Returns focus to trigger on close
 * - Handles dynamic content
 * - ESC key to close
 * 
 * @module FocusTrap
 * @category common
 */

import { useEffect, useRef, ReactNode } from 'react';

interface FocusTrapProps {
  /** Whether the trap is active */
  active: boolean;
  /** Child elements to trap focus within */
  children: ReactNode;
  /** Callback when ESC is pressed */
  onEscape?: () => void;
  /** Element to return focus to when deactivated */
  returnFocusRef?: React.RefObject<HTMLElement>;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Get all focusable elements within a container.
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(',');
  
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (element) => {
      // Check if element is visible
      const style = window.getComputedStyle(element);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        element.offsetParent !== null
      );
    }
  );
}

/**
 * Focus Trap Component.
 * 
 * Traps keyboard focus within its children when active.
 * 
 * @component
 * @category common
 * 
 * @param {FocusTrapProps} props - Component props
 * @returns {JSX.Element} Focus trap container
 * 
 * @example
 * <FocusTrap active={isOpen} onEscape={() => setIsOpen(false)}>
 *   <Dialog>
 *     <input />
 *     <button>Close</button>
 *   </Dialog>
 * </FocusTrap>
 * 
 * @accessibility
 * - Traps Tab/Shift+Tab within container
 * - ESC key support
 * - Returns focus to trigger element
 * - Handles dynamic content updates
 */
export function FocusTrap({
  active,
  children,
  onEscape,
  returnFocusRef,
  className,
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!active || !containerRef.current) return;
    
    // Store the element that triggered the trap
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    // Focus the first focusable element
    const focusableElements = getFocusableElements(containerRef.current);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    
    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      // ESC key
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }
      
      // Tab key
      if (e.key === 'Tab') {
        const focusableElements = getFocusableElements(containerRef.current);
        
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Shift+Tab on first element -> focus last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
          return;
        }
        
        // Tab on last element -> focus first element
        if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
          return;
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Return focus to trigger element
      if (returnFocusRef?.current) {
        returnFocusRef.current.focus();
      } else if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [active, onEscape, returnFocusRef]);
  
  if (!active) {
    return <>{children}</>;
  }
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Hook for creating a focus trap.
 * 
 * @param {boolean} active - Whether the trap is active
 * @param {() => void} onEscape - Callback when ESC is pressed
 * @returns {React.RefObject<HTMLDivElement>} Container ref
 * 
 * @example
 * const containerRef = useFocusTrap(isOpen, () => setIsOpen(false));
 * 
 * return (
 *   <div ref={containerRef}>
 *     // Focusable content
 *   </div>
 * );
 */
export function useFocusTrap(active: boolean, onEscape?: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!active || !containerRef.current) return;
    
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    const focusableElements = getFocusableElements(containerRef.current);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }
      
      if (e.key === 'Tab') {
        const focusableElements = getFocusableElements(containerRef.current);
        
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
          return;
        }
        
        if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
          return;
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [active, onEscape]);
  
  return containerRef;
}
