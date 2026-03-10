/**
 * Navigation Context for route-based navigation.
 * 
 * Provides navigation functions to all components using React Router.
 * Components can navigate between pages without prop drilling.
 * 
 * @module NavigationContext
 * @category contexts
 */

import { createContext, useContext, useCallback, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { resolveNavigationPath } from '../lib/navigation';

/**
 * Navigation context interface.
 */
interface NavigationContextType {
  /**
   * Navigate to a specific URL path.
   * @param path - URL path (e.g., '/tours', '/tours/iceland-explorer')
   */
  navigateTo: (path: string) => void;
  
  /**
   * Navigate to a tour single page.
   * @param slug - Tour slug (e.g., 'iceland-explorer')
   */
  navigateToTour: (slug: string) => void;
  
  /**
   * Navigate to a destination single page.
   * @param slug - Destination slug
   */
  navigateToDestination: (slug: string) => void;
  
  /**
   * Navigate to a blog post single page.
   * @param slug - Post slug
   */
  navigateToBlogPost: (slug: string) => void;
  
  /**
   * Navigate to an accommodation single page.
   * @param slug - Accommodation slug
   */
  navigateToAccommodation: (slug: string) => void;
  
  /**
   * Navigate to a special single page.
   * @param slug - Special slug
   */
  navigateToSpecial: (slug: string) => void;
  
  /**
   * Navigate to a team member single page.
   * @param slug - Team member slug
   */
  navigateToTeamMember: (slug: string) => void;
  
  /**
   * Navigate to a review single page.
   * @param slug - Review slug
   */
  navigateToReview: (slug: string) => void;
  
  /**
   * Navigate back to the previous page.
   */
  goBack: () => void;
  
  /**
   * Current pathname.
   */
  currentPath: string;
}

/**
 * Navigation context.
 */
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

/**
 * Props for NavigationProvider.
 */
interface NavigationProviderProps {
  children: ReactNode;
}

/**
 * Navigation Provider component.
 * 
 * Wraps the application and provides React Router-based navigation
 * functions to all components.
 * 
 * @param {NavigationProviderProps} props - Component properties
 * @returns {JSX.Element} Provider component
 */
export function NavigationProvider({ children }: NavigationProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = useCallback((path: string) => {
    const resolved = resolveNavigationPath(path);
    navigate(resolved);
  }, [navigate]);

  const navigateToTour = useCallback((slug: string) => {
    navigate(`/tours/${slug}`);
  }, [navigate]);

  const navigateToDestination = useCallback((slug: string) => {
    navigate(`/destinations/${slug}`);
  }, [navigate]);

  const navigateToBlogPost = useCallback((slug: string) => {
    navigate(`/blog/${slug}`);
  }, [navigate]);

  const navigateToAccommodation = useCallback((slug: string) => {
    navigate(`/accommodation/${slug}`);
  }, [navigate]);

  const navigateToSpecial = useCallback((slug: string) => {
    navigate(`/specials/${slug}`);
  }, [navigate]);

  const navigateToTeamMember = useCallback((slug: string) => {
    navigate(`/team/${slug}`);
  }, [navigate]);

  const navigateToReview = useCallback((slug: string) => {
    navigate(`/reviews/${slug}`);
  }, [navigate]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const value: NavigationContextType = {
    navigateTo,
    navigateToTour,
    navigateToDestination,
    navigateToBlogPost,
    navigateToAccommodation,
    navigateToSpecial,
    navigateToTeamMember,
    navigateToReview,
    goBack,
    currentPath: location.pathname,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * Hook to use navigation context.
 * 
 * @returns {NavigationContextType} Navigation context
 * @throws {Error} If used outside NavigationProvider
 * 
 * @example
 * const { navigateToTour } = useNavigation();
 * <TourCard tour={tour} onClick={() => navigateToTour(tour.slug)} />
 */
export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}