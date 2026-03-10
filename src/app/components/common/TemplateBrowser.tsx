/**
 * Template Browser component for development and demonstration.
 * 
 * Provides a floating UI for navigating between different page templates
 * and archetypes during development. Organized by WordPress archetype
 * with collapsible categories for easy navigation.
 * 
 * **Purpose:**
 * - Development tool for testing templates
 * - Demonstration tool for showcasing WordPress patterns
 * - Quick navigation between page archetypes
 * - Template comparison and validation
 * 
 * **Features:**
 * - Search templates by name or description
 * - Organized by WordPress archetype categories
 * - Collapsible category sections
 * - Visual indicator of current template
 * - WordPress alignment labels
 * - Smooth page transitions
 * 
 * **Categories:**
 * 1. WordPress Templates (archive-*.html, single-*.html)
 * 2. Archive Pages (Content Hub Archetype)
 * 3. Single Pages (Single Detail Archetype)
 * 4. Taxonomy & Editorial
 * 5. Utility Pages
 * 6. Conversion Pages
 * 7. Development Tools
 * 
 * **Note:** This is a development/demo tool and should not be included
 * in production WordPress themes.
 * 
 * @module TemplateBrowser
 * @category common
 * @see /guidelines/DESIGN-SYSTEM-GUIDE.md
 */

import { useState } from 'react';
import { CaretDown, CaretUp, CaretRight, Stack, MagnifyingGlass, X, ArrowsDownUp } from '@phosphor-icons/react';

/**
 * Page configuration for template browser.
 * 
 * @interface Page
 */
interface Page {
  /** Unique page identifier (matches App.tsx PAGES array) */
  id: string;
  
  /** Display label shown in template list */
  label: string;
  
  /** Brief description of template/archetype */
  description: string;
  
  /** React component to render for this page */
  component: React.ComponentType;
}

/**
 * Template category for grouping pages.
 * 
 * @interface TemplateCategory
 */
interface TemplateCategory {
  /** Category name */
  name: string;
  
  /** Category description */
  description: string;
  
  /** Page IDs in this category */
  pageIds: string[];
}

/**
 * Props for the TemplateBrowser component.
 * 
 * @interface TemplateBrowserProps
 */
interface TemplateBrowserProps {
  /**
   * Array of all available page templates.
   * Typically imported from App.tsx PAGES constant.
   */
  pages: Page[];
  
  /**
   * Currently active page ID.
   * Used to highlight the current template in the list.
   */
  activePage: string;
  
  /**
   * Callback fired when user selects a different page.
   * 
   * @param {string} pageId - ID of selected page
   * 
   * @example
   * onPageChange={(pageId) => setCurrentPage(pageId)}
   */
  onPageChange: (pageId: string) => void;
}

/**
 * Template categories organized by WordPress archetype.
 */
const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    name: '🏠 Homepage',
    description: 'Main landing page',
    pageIds: ['home-page'],
  },
  {
    name: '📋 WordPress Templates',
    description: 'Official WordPress block theme templates',
    pageIds: [
      'tour-archive-wp',
      'tour-single-wp',
      'destination-archive-wp',
      'destination-single-wp',
    ],
  },
  {
    name: '📚 Archive Pages (Content Hubs)',
    description: 'Archive/listing pages with filtering',
    pageIds: [
      'tours-archive',
      'destinations-archive',
      'blog-archive',
      'accommodation-archive',
      'team-archive',
      'specials-archive',
      'reviews-archive',
    ],
  },
  {
    name: '📄 Single Pages (Detail Views)',
    description: 'Individual content detail pages',
    pageIds: [
      'tour-single',
      'destination-single',
      'accommodation-single',
      'blog-single',
      'special-single',
    ],
  },
  {
    name: '🏷️ Taxonomy & Editorial',
    description: 'Taxonomy archives and editorial content',
    pageIds: [
      'taxonomy-archive',
    ],
  },
  {
    name: '🔧 Utility Pages',
    description: 'Static utility and information pages',
    pageIds: [
      'about-page',
      'contact-page',
      'faq-page',
      'privacy-policy-page',
      'terms-conditions-page',
      'why-book-with-us-page',
      'trip-planner-page',
      'search-results-page',
    ],
  },
  {
    name: '💰 Conversion Pages',
    description: 'Lead generation and conversion pages',
    pageIds: [
      'reviews-hub-page',
      'quote-request-page',
      'destination-guides-hub-page',
      'travel-insurance-page',
      'newsletter-signup-page',
      'packing-guides-page',
    ],
  },
  {
    name: '🔄 Legacy Pages',
    description: 'Legacy implementations for reference',
    pageIds: [
      'tour-archive-new',
      'tour-single-new',
    ],
  },
  {
    name: '🛠️ Development Tools',
    description: 'Developer utilities and showcases',
    pageIds: [
      'template-tester',
      'component-showcase',
      'component-api-reference',
      'block-documentation',
      'design-blocks-showcase',
      'theme-blocks-showcase',
      'header-footer-comparison',
      'button-showcase',
      'section-styles-showcase',
    ],
  },
];

/**
 * Template Browser component with organized categories.
 * 
 * @component
 * @category common
 * 
 * @param {TemplateBrowserProps} props - Component properties
 * @returns {JSX.Element} Rendered template browser
 */
export function TemplateBrowser({ pages, activePage, onPageChange }: TemplateBrowserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'category'>('category');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    '📚 Archive Pages (Content Hubs)',
  ]);

  const currentPage = pages.find(p => p.id === activePage);

  /**
   * Toggle category expansion state.
   * 
   * @param {string} categoryName - Name of category to toggle
   */
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  /**
   * Filters pages based on search query.
   * Returns pages and their category if they match.
   */
  const getFilteredCategories = () => {
    if (!searchQuery.trim()) {
      return TEMPLATE_CATEGORIES;
    }

    const query = searchQuery.toLowerCase();
    
    return TEMPLATE_CATEGORIES.map(category => ({
      ...category,
      pageIds: category.pageIds.filter(pageId => {
        const page = pages.find(p => p.id === pageId);
        return (
          page?.label.toLowerCase().includes(query) ||
          page?.description.toLowerCase().includes(query)
        );
      }),
    })).filter(category => category.pageIds.length > 0);
  };

  /**
   * Sort categories and pages based on selected sort option
   */
  const getSortedCategories = () => {
    const filtered = getFilteredCategories();
    
    if (sortBy === 'name') {
      // Sort all pages alphabetically, ignoring categories
      const allPages = filtered.flatMap(cat => 
        cat.pageIds.map(pageId => ({
          ...pages.find(p => p.id === pageId)!,
          categoryName: cat.name
        }))
      ).sort((a, b) => a.label.localeCompare(b.label));

      // Return a single "All Templates" category
      return [{
        name: '📑 All Templates (A-Z)',
        description: 'Sorted alphabetically',
        pageIds: allPages.map(p => p.id)
      }];
    }
    
    // Default: sort by category
    return filtered;
  };

  const filteredCategories = getSortedCategories();
  const totalPages = filteredCategories.reduce((sum, cat) => sum + cat.pageIds.length, 0);

  // Auto-expand when sorting by name
  if (sortBy === 'name' && filteredCategories.length > 0 && !expandedCategories.includes(filteredCategories[0].name)) {
    setExpandedCategories([filteredCategories[0].name]);
  }

  /**
   * Handles page selection from the list.
   * 
   * @param {string} pageId - ID of selected page
   */
  const handlePageSelect = (pageId: string) => {
    onPageChange(pageId);
    setIsOpen(false);
    setSearchQuery('');
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed top-6 left-6 z-[60]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="wp-common-template-browser__toggle"
        aria-label="Open template browser"
        aria-expanded={isOpen}
      >
        <Stack className="w-5 h-5" />
        <span className="hidden sm:inline">Templates</span>
        {isOpen ? (
          <CaretUp className="w-4 h-4" />
        ) : (
          <CaretDown className="w-4 h-4" />
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="absolute top-full mt-2 w-screen max-w-lg bg-card border border-border rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="wp-common-template-browser__header">
              <div className="flex items-center justify-between mb-3">
                <h2 
                  className="wp-common-template-browser__header-title"
                >
                  Template Browser
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-muted transition-colors"
                  aria-label="Close template browser"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-3">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                   type="search"
                   placeholder="Search templates..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="wp-common-template-browser__search"
                 />
              </div>

              {/* Sort Options */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('category')}
                  className={`wp-common-template-browser__sort-button ${
                    sortBy === 'category' 
                      ? 'wp-common-template-browser__sort-button--active' 
                      : 'wp-common-template-browser__sort-button--inactive'
                  }`}
                >
                  <Stack className="w-3 h-3" />
                  By Category
                </button>
                <button
                  onClick={() => setSortBy('name')}
                  className={`wp-common-template-browser__sort-button ${
                    sortBy === 'name' 
                      ? 'wp-common-template-browser__sort-button--active' 
                      : 'wp-common-template-browser__sort-button--inactive'
                  }`}
                >
                  <ArrowsDownUp className="w-3 h-3" />
                  A-Z
                </button>
              </div>
            </div>

            {/* Current Template */}
            <div className="wp-common-template-browser__current">
              <p 
                className="wp-common-template-browser__current-label"
              >
                Current Template
              </p>
              <p 
                className="wp-common-template-browser__current-title"
              >
                {currentPage?.label}
              </p>
              <p 
                className="wp-common-template-browser__current-desc"
              >
                {currentPage?.description}
              </p>
            </div>

            {/* Template List by Category */}
            <div className="max-h-[500px] overflow-y-auto">
              {filteredCategories.length > 0 ? (
                <div>
                  {filteredCategories.map((category) => (
                    <div key={category.name} className="border-b border-border last:border-0">
                      {/* Category Header */}
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className="wp-common-template-browser__category-header"
                      >
                        <div className="flex-1 text-left">
                          <div 
                            className="wp-common-template-browser__category-name"
                          >
                            <span className="wp-common-template-browser__category-name-text">
                              {category.name}
                            </span>
                            <span 
                              className="wp-common-template-browser__category-count"
                            >
                              {category.pageIds.length}
                            </span>
                          </div>
                          <p 
                            className="wp-common-template-browser__category-desc"
                          >
                            {category.description}
                          </p>
                        </div>
                        {expandedCategories.includes(category.name) ? (
                          <CaretDown className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                        ) : (
                          <CaretRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                        )}
                      </button>

                      {/* Category Items */}
                      {expandedCategories.includes(category.name) && (
                        <div className="bg-card">
                          {category.pageIds.map((pageId) => {
                            const page = pages.find(p => p.id === pageId);
                            if (!page) return null;

                            return (
                              <button
                                key={pageId}
                                onClick={() => handlePageSelect(pageId)}
                                className={`wp-common-template-browser__page-link ${
                                  pageId === activePage
                                    ? 'wp-common-template-browser__page-link--active'
                                    : 'wp-common-template-browser__page-link--inactive'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <p 
                                      className={`wp-common-template-browser__page-title ${
                                        pageId === activePage ? 'wp-common-template-browser__page-title--active' : 'wp-common-template-browser__page-title--inactive'
                                      }`}
                                    >
                                      {page.label}
                                    </p>
                                    <p 
                                      className="wp-common-template-browser__page-desc"
                                    >
                                      {page.description}
                                    </p>
                                  </div>
                                  {pageId === activePage && (
                                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-1" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="wp-common-template-browser__empty">
                  <MagnifyingGlass className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p 
                    className="wp-common-template-browser__empty-text"
                  >
                    No templates found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="wp-common-template-browser__footer">
              <p 
                className="wp-common-template-browser__footer-stats"
              >
                {totalPages} template{totalPages !== 1 ? 's' : ''} • {filteredCategories.length} categor{filteredCategories.length !== 1 ? 'ies' : 'y'}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}