/**
 * Custom hook for managing blog archive filters.
 * 
 * Extracts filtering logic from the ArchiveBlogTemplate.
 * 
 * @module useBlogFilters
 * @category hooks
 */

import { useState, useMemo } from "react";
import type { BlogPost } from "../data/types";

/**
 * useBlogFilters hook.
 * 
 * @param {BlogPost[]} posts - The full list of blog posts to filter.
 * @param {number} itemsPerPage - Number of items to display per page.
 */
export function useBlogFilters(posts: BlogPost[], itemsPerPage: number = 12) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === "all" || post.categories.includes(selectedCategory);
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  return {
    currentPage,
    setCurrentPage,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredPosts,
    paginatedPosts,
    totalPages,
    resetFilters,
  };
}
