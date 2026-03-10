/**
 * FAQs Archive Page - WordPress Template
 * 
 * Main FAQ archive page with search form, category filters,
 * and expandable FAQ accordions.
 * Now uses PageShell for centralized breadcrumbs + hero.
 */

import { useState, useMemo } from "react";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { SearchFilterPattern } from "../components/patterns/SearchFilterPattern";
import { EmptyStatePattern } from "../components/patterns/EmptyStatePattern";
import { PageShell } from "../components/parts/PageShell";
import { FAQS, FAQ_CATEGORIES, searchFAQs } from "../data/faqs";
import { useNavigation } from "../contexts/NavigationContext";

/**
 * FAQs Archive Page Component
 */
export function FAQsArchivePage() {
  const { navigateTo } = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let results = FAQS;

    if (searchQuery.trim()) {
      results = searchFAQs(searchQuery);
    }

    if (activeCategory) {
      results = results.filter(faq => faq.categories.includes(activeCategory));
    }

    return results;
  }, [searchQuery, activeCategory]);

  // Group filtered FAQs by category for display
  const groupedFAQs = useMemo(() => {
    const groups: Record<string, typeof FAQS> = {};
    filteredFAQs.forEach(faq => {
      const catId = faq.categories[0] || "general";
      if (!groups[catId]) groups[catId] = [];
      groups[catId].push(faq);
    });
    return groups;
  }, [filteredFAQs]);

  const handleFilterChange = (values: Record<string, any>) => {
    if (values.search !== undefined) setSearchQuery(values.search);
    if (values.category !== undefined) setActiveCategory(values.category || null);
  };

  const handleClear = () => {
    setSearchQuery("");
    setActiveCategory(null);
  };

  return (
    <PageShell context="faqs-archive">
      {/* Search & Filter */}
      <SearchFilterPattern
        filters={[
          {
            id: "search",
            type: "search",
            label: "Search Questions",
            placeholder: "Keywords...",
            value: searchQuery
          },
          {
            id: "category",
            label: "Topic",
            type: "select",
            placeholder: "All Topics",
            value: activeCategory || "",
            options: FAQ_CATEGORIES.map(cat => ({
              value: cat.slug,
              label: cat.name
            }))
          }
        ]}
        onFilterChange={handleFilterChange}
        onClearAll={handleClear}
        activeFiltersCount={(searchQuery ? 1 : 0) + (activeCategory ? 1 : 0)}
        collapsible={true}
      />

      {/* FAQ Sections */}
      <section className="py-section-md">
        {filteredFAQs.length > 0 ? (
          Object.entries(groupedFAQs).map(([catId, faqs]) => {
            const category = FAQ_CATEGORIES.find(c => c.id === catId);
            return (
              <div key={catId} className="mb-16 last:mb-0">
                <FAQ 
                  items={faqs} 
                  title={category?.name || "General Information"}
                  intro={category?.description}
                />
              </div>
            );
          })
        ) : (
          <EmptyStatePattern
            icon="search"
            title="No matching questions"
            message="Try broadening your search or choosing a different category topic."
            primaryAction={{
              label: "Show All FAQs",
              onClick: handleClear
            }}
          />
        )}
      </section>

      {/* CTA */}
      <CTA
        title="Still Need Assistance?"
        description="Our dedicated support team is available Monday through Friday to help with specific inquiries."
        variant="gradient"
        primaryAction={{
          label: "Contact Support",
          onClick: () => navigateTo("/contact"),
        }}
        secondaryAction={{
          label: "Request a Quote",
          onClick: () => navigateTo("/contact"),
        }}
      />
    </PageShell>
  );
}

export default FAQsArchivePage;
