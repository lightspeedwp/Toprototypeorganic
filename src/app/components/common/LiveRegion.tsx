/**
 * Live Region Component
 * 
 * Provides screen reader announcements for dynamic content changes.
 * Essential for WCAG 2.1 Level A compliance for dynamic updates.
 * 
 * **WCAG Criteria:**
 * - 4.1.3 Status Messages (Level AA)
 * - 1.3.1 Info and Relationships (Level A)
 * 
 * **Features:**
 * - Polite/assertive announcement modes
 * - Auto-clear after announcement
 * - Multiple concurrent announcements
 * - Screen reader optimized
 * 
 * @module LiveRegion
 * @category common
 */

import { useEffect, useRef } from 'react';
import { create } from 'zustand';

/**
 * Live region announcement priority.
 */
export type LiveRegionPriority = 'polite' | 'assertive';

/**
 * Announcement message.
 */
interface Announcement {
  id: string;
  message: string;
  priority: LiveRegionPriority;
  timestamp: number;
}

/**
 * Live region store.
 */
interface LiveRegionStore {
  announcements: Announcement[];
  announce: (message: string, priority?: LiveRegionPriority) => void;
  clear: () => void;
}

/**
 * Global live region store.
 */
export const useLiveRegion = create<LiveRegionStore>((set) => ({
  announcements: [],
  
  announce: (message: string, priority: LiveRegionPriority = 'polite') => {
    const announcement: Announcement = {
      id: `${Date.now()}-${Math.random()}`,
      message,
      priority,
      timestamp: Date.now(),
    };
    
    set((state) => ({
      announcements: [...state.announcements, announcement],
    }));
    
    // Auto-clear after 5 seconds
    setTimeout(() => {
      set((state) => ({
        announcements: state.announcements.filter((a) => a.id !== announcement.id),
      }));
    }, 5000);
  },
  
  clear: () => set({ announcements: [] }),
}));

/**
 * Live Region Component.
 * 
 * Renders a visually hidden live region for screen reader announcements.
 * Should be placed at the root of the application.
 * 
 * @component
 * @category common
 * 
 * @example
 * // In App.tsx or layout
 * <LiveRegion />
 * 
 * // Anywhere in the app
 * const announce = useLiveRegion((state) => state.announce);
 * announce('Item added to cart', 'polite');
 * 
 * @accessibility
 * - Uses ARIA live regions
 * - Supports polite and assertive modes
 * - Visually hidden but screen reader accessible
 * - Auto-clears to prevent repetition
 */
export function LiveRegion() {
  const announcements = useLiveRegion((state) => state.announcements);
  const politeRef = useRef<HTMLDivElement>(null);
  const assertiveRef = useRef<HTMLDivElement>(null);
  
  const politeAnnouncements = announcements.filter((a) => a.priority === 'polite');
  const assertiveAnnouncements = announcements.filter((a) => a.priority === 'assertive');
  
  return (
    <>
      {/* Polite announcements - don't interrupt */}
      <div
        ref={politeRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeAnnouncements.map((announcement) => (
          <div key={announcement.id}>{announcement.message}</div>
        ))}
      </div>
      
      {/* Assertive announcements - interrupt immediately */}
      <div
        ref={assertiveRef}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveAnnouncements.map((announcement) => (
          <div key={announcement.id}>{announcement.message}</div>
        ))}
      </div>
    </>
  );
}

/**
 * Hook for making announcements.
 * 
 * @returns {Object} Announcement functions
 * 
 * @example
 * const { announcePolite, announceAssertive } = useAnnounce();
 * 
 * announcePolite('Form saved successfully');
 * announceAssertive('Error: Required field missing');
 */
export function useAnnounce() {
  const announce = useLiveRegion((state) => state.announce);
  
  return {
    announcePolite: (message: string) => announce(message, 'polite'),
    announceAssertive: (message: string) => announce(message, 'assertive'),
    announce,
  };
}
