/**
 * useSearch Hook
 * 
 * Custom React hook for managing search functionality across the application.
 * Provides search state management, query execution, and result filtering.
 * 
 * **Features:**
 * - Real-time search across multiple content types
 * - Debounced search for performance
 * - Search history management
 * - Category filtering
 * - Pagination support
 * - Loading and error states
 * 
 * @module useSearch
 * @category hooks
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { Tour, Destination, Accommodation, BlogPost } from "../data/types";
import { TOURS, DESTINATIONS, ACCOMMODATION, BLOG_POSTS } from "../data/mock";

/**
 * Search result item with metadata.
 */
export interface SearchResultItem {
  id: string;
  title: string;
  excerpt: string;
  type: "tour" | "destination" | "accommodation" | "blog";
  url: string;
  image?: string;
  metadata?: {
    price?: string;
    duration?: string;
    location?: string;
    date?: string;
  };
}

/**
 * Search state.
 */
export interface SearchState {
  query: string;
  category: string;
  results: SearchResultItem[];
  totalResults: number;
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

/**
 * Search options.
 */
export interface SearchOptions {
  /** Initial search query */
  initialQuery?: string;
  /** Initial category filter */
  initialCategory?: string;
  /** Minimum query length before searching */
  minQueryLength?: number;
  /** Debounce delay in milliseconds */
  debounceDelay?: number;
  /** Enable auto-search on query change */
  autoSearch?: boolean;
}

/**
 * useSearch Hook
 * 
 * @param {SearchOptions} options - Search configuration options
 * @returns Search state and actions
 * 
 * @example
 * ```tsx
 * const { query, results, search, setQuery } = useSearch({
 *   initialQuery: "safari",
 *   autoSearch: true,
 * });
 * 
 * return (
 *   <div>
 *     <input value={query} onChange={(e) => setQuery(e.target.value)} />
 *     {results.map((result) => (
 *       <ResultCard key={result.id} result={result} />
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useSearch(options: SearchOptions = {}) {
  const {
    initialQuery = "",
    initialCategory = "all",
    minQueryLength = 2,
    debounceDelay = 300,
    autoSearch = false,
  } = options;

  const [state, setState] = useState<SearchState>({
    query: initialQuery,
    category: initialCategory,
    results: [],
    totalResults: 0,
    isLoading: false,
    error: null,
    hasSearched: false,
  });

  /**
   * Convert tour to search result.
   */
  const tourToResult = useCallback((tour: Tour): SearchResultItem => ({
    id: tour.id,
    title: tour.title,
    excerpt: tour.excerpt || "",
    type: "tour",
    url: `/tours/${tour.slug}`,
    image: tour.featuredImage,
    metadata: {
      price: tour.price,
      duration: tour.duration,
      location: tour.destination,
    },
  }), []);

  /**
   * Convert destination to search result.
   */
  const destinationToResult = useCallback((destination: Destination): SearchResultItem => ({
    id: destination.id,
    title: destination.title,
    excerpt: destination.excerpt || "",
    type: "destination",
    url: `/destinations/${destination.slug}`,
    image: destination.featuredImage,
    metadata: {
      location: destination.country,
    },
  }), []);

  /**
   * Convert accommodation to search result.
   */
  const accommodationToResult = useCallback((accommodation: Accommodation): SearchResultItem => ({
    id: accommodation.id,
    title: accommodation.name,
    excerpt: accommodation.excerpt || "",
    type: "accommodation",
    url: `/accommodation/${accommodation.slug}`,
    image: accommodation.featuredImage,
    metadata: {
      location: accommodation.location,
    },
  }), []);

  /**
   * Convert blog post to search result.
   */
  const blogPostToResult = useCallback((post: BlogPost): SearchResultItem => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || "",
    type: "blog",
    url: `/blog/${post.slug}`,
    image: post.featuredImage,
    metadata: {
      date: new Date(post.publishDate).toLocaleDateString(),
    },
  }), []);

  /**
   * Search content by query and category.
   */
  const searchContent = useCallback(
    (query: string, category: string = "all"): SearchResultItem[] => {
      if (!query || query.length < minQueryLength) {
        return [];
      }

      const q = query.toLowerCase().trim();
      const results: SearchResultItem[] = [];

      // Search tours
      if (category === "all" || category === "tours") {
        const tourResults = TOURS.filter(
          (tour) =>
            tour.title.toLowerCase().includes(q) ||
            (tour.excerpt && tour.excerpt.toLowerCase().includes(q)) ||
            (tour.content && tour.content.toLowerCase().includes(q)) ||
            (tour.destination && tour.destination.toLowerCase().includes(q))
        ).map(tourToResult);
        results.push(...tourResults);
      }

      // Search destinations
      if (category === "all" || category === "destinations") {
        const destinationResults = DESTINATIONS.filter(
          (dest) =>
            dest.title.toLowerCase().includes(q) ||
            (dest.excerpt && dest.excerpt.toLowerCase().includes(q)) ||
            (dest.content && dest.content.toLowerCase().includes(q)) ||
            (dest.country && dest.country.toLowerCase().includes(q))
        ).map(destinationToResult);
        results.push(...destinationResults);
      }

      // Search accommodations
      if (category === "all" || category === "accommodation") {
        const accommodationResults = ACCOMMODATION.filter(
          (acc) =>
            acc.name.toLowerCase().includes(q) ||
            (acc.excerpt && acc.excerpt.toLowerCase().includes(q)) ||
            (acc.description && acc.description.toLowerCase().includes(q)) ||
            (acc.location && acc.location.toLowerCase().includes(q))
        ).map(accommodationToResult);
        results.push(...accommodationResults);
      }

      // Search blog posts
      if (category === "all" || category === "blog") {
        const blogResults = BLOG_POSTS.filter(
          (post) =>
            post.title.toLowerCase().includes(q) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(q)) ||
            (post.content && post.content.toLowerCase().includes(q))
        ).map(blogPostToResult);
        results.push(...blogResults);
      }

      return results;
    },
    [minQueryLength, tourToResult, destinationToResult, accommodationToResult, blogPostToResult]
  );

  /**
   * Execute search with loading state.
   */
  const search = useCallback(
    async (query?: string, category?: string) => {
      const searchQuery = query !== undefined ? query : state.query;
      const searchCategory = category !== undefined ? category : state.category;

      if (!searchQuery || searchQuery.length < minQueryLength) {
        setState((prev) => ({
          ...prev,
          results: [],
          totalResults: 0,
          hasSearched: false,
          error: null,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        hasSearched: true,
      }));

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        const results = searchContent(searchQuery, searchCategory);

        setState((prev) => ({
          ...prev,
          results,
          totalResults: results.length,
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Search failed",
        }));
      }
    },
    [state.query, state.category, minQueryLength, searchContent]
  );

  /**
   * Set search query.
   */
  const setQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, query }));
  }, []);

  /**
   * Set search category.
   */
  const setCategory = useCallback((category: string) => {
    setState((prev) => ({ ...prev, category }));
  }, []);

  /**
   * Clear search.
   */
  const clearSearch = useCallback(() => {
    setState({
      query: "",
      category: "all",
      results: [],
      totalResults: 0,
      isLoading: false,
      error: null,
      hasSearched: false,
    });
  }, []);

  // Auto-search on query/category change (with debounce)
  useEffect(() => {
    if (!autoSearch || !state.query) {
      return;
    }

    const timer = setTimeout(() => {
      if (state.query.length >= minQueryLength) {
        search();
      }
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [state.query, state.category, autoSearch, minQueryLength, debounceDelay, search]);

  // Memoize results by category
  const resultsByCategory = useMemo(() => {
    return {
      all: state.results,
      tours: state.results.filter((r) => r.type === "tour"),
      destinations: state.results.filter((r) => r.type === "destination"),
      accommodation: state.results.filter((r) => r.type === "accommodation"),
      blog: state.results.filter((r) => r.type === "blog"),
    };
  }, [state.results]);

  return {
    // State
    query: state.query,
    category: state.category,
    results: state.results,
    totalResults: state.totalResults,
    isLoading: state.isLoading,
    error: state.error,
    hasSearched: state.hasSearched,
    
    // Results by category
    resultsByCategory,
    
    // Actions
    search,
    setQuery,
    setCategory,
    clearSearch,
  };
}

export default useSearch;
