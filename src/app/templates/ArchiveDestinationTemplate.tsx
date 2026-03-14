/**
 * Archive Destination Template
 * 
 * Comprehensive destinations archive with hierarchical navigation and modern design.
 * Strictly adheres to design system tokens and BEM naming.
 * 
 * WordPress Mapping:
 * - Template: archive-destination.html
 * - Post Type: destination
 */

import { MagnifyingGlass as Search, Globe, X } from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { SectionHeader } from "../components/common/SectionHeader";
import { PageShell } from "../components/parts/PageShell";
import { DestinationCollectionBlock } from "../components/blocks/DestinationCollectionBlock";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { ActiveFilterSummary, searchFilterTag, singleFilterTag, buildFilterTags } from "../components/patterns/ActiveFilterSummary";
import { ALL_DESTINATIONS, ALL_CONTINENTS } from "../data/mockExpanded";
import { getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { useDestinationFilters } from "../hooks/useDestinationFilters";
import { motion as Motion } from "motion/react";

export function ArchiveDestinationTemplate() {
  const faqData = getPageSectionFAQs("destinations-archive");
  const { navigateToDestination, navigateTo } = useNavigation();

  const {
    searchQuery,
    setSearchQuery,
    flushSearch,
    selectedContinent,
    setSelectedContinent,
    filteredDestinations,
    resetFilters
  } = useDestinationFilters(ALL_DESTINATIONS);

  const archetypes = [
    { title: "Wildlife & Safari", desc: "Soul-stirring encounters with the wild.", icon: "🦁", color: "bg-primary/10 text-primary" },
    { title: "Coastal Estates", desc: "Refined relaxation on pristine shores.", icon: "🏝️", color: "bg-secondary/10 text-secondary" },
    { title: "Ancient Civilizations", desc: "Deep dives into legendary history.", icon: "🏛️", color: "bg-accent/10 text-accent" },
    { title: "Alpine Frontiers", desc: "Bold adventures in thin air.", icon: "⛰️", color: "bg-muted text-muted-foreground" },
  ];

  return (
    <PageShell
      context="destinations-archive"
      as="main"
      className="wp-template-archive-destination theme-organic"
      heroProps={{
        primaryCTA: {
          label: "Browse Destinations",
          onClick: () => navigateTo("/destinations")
        },
        secondaryCTA: {
          label: "View All Tours",
          onClick: () => navigateTo("/tours"),
          variant: "outline"
        }
      }}
    >
      <div className="organic-section-top">
        {/* Continent Navigation Bar */}
        <section className="wp-template-archive-destination__nav-bar">
          <Container>
            <div className="wp-template-archive-destination__nav-inner">
              <nav className="wp-template-archive-destination__territory-group" aria-label="Territory filter">
                <div className="wp-template-archive-destination__nav-label">
                  <Globe className="size-3" /> Explore By Territory
                </div>
                <div className="wp-template-archive-destination__nav-list">
                  <button
                    onClick={() => setSelectedContinent("all")}
                    className={`wp-template-archive-destination__nav-btn ${selectedContinent === "all" ? 'wp-template-archive-destination__nav-btn--active' : ''}`}
                  >
                    All Regions
                  </button>
                  {ALL_CONTINENTS.map(continent => (
                    <button
                      key={continent.id}
                      onClick={() => setSelectedContinent(continent.id)}
                      className={`wp-template-archive-destination__nav-btn ${selectedContinent === continent.id ? 'wp-template-archive-destination__nav-btn--active' : ''}`}
                    >
                      {continent.name}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="wp-template-archive-destination__search-wrapper">
                <Search className="wp-template-archive-destination__search-icon" />
                <input
                  type="text"
                  placeholder="Find a territory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') flushSearch(); }}
                  className="wp-template-archive-destination__search-input"
                />
                {searchQuery && (
                  <button
                    className="wp-template-archive-destination__search-clear"
                    onClick={() => resetFilters()}
                  >
                    <X className="size-3" />
                  </button>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Active Filter Summary */}
        <Container>
          <ActiveFilterSummary
            tags={buildFilterTags(
              searchFilterTag(searchQuery, () => setSearchQuery("")),
              singleFilterTag(
                "continent",
                selectedContinent,
                ALL_CONTINENTS.find((c) => c.id === selectedContinent)?.name || selectedContinent,
                () => setSelectedContinent("all"),
                "all"
              ),
            )}
            onClearAll={resetFilters}
          />
        </Container>
      </div>

      <div className="organic-section-middle">
        {/* Results Grid */}
        <section className="py-section-lg">
          <Container className="flex flex-col gap-gap-xl">
            <SectionHeader
              section={{
                title: "The Collection",
                description: `Discover ${filteredDestinations.length} profound destinations across the globe.`
              }}
              centered={false}
            />

            <DestinationCollectionBlock 
              destinations={filteredDestinations}
              showSearch={false}
              onSelect={(dest) => navigateToDestination(dest.slug)}
            />
          </Container>
        </section>
      </div>

      <div className="organic-section-middle-alt">
        {/* Inspiration Blocks */}
        <section className="wp-template-archive-destination__archetypes">
          <Container className="flex flex-col gap-gap-xl">
            <SectionHeader
              section={{
                eyebrow: "Curation",
                title: "Expedition Archetypes",
                description: "Carefully categorized experiences to match your travel philosophy."
              }}
              centered={true}
            />

            <div className="wp-template-archive-destination__archetypes-grid">
              {archetypes.map((cat, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="wp-template-archive-destination__archetype-card"
                >
                  <div className={`wp-template-archive-destination__archetype-icon-wrapper ${cat.color}`}>
                    {cat.icon}
                  </div>
                  <h3 className="wp-template-archive-destination__archetype-title wp-text--hand">{cat.title}</h3>
                  <p className="wp-template-archive-destination__archetype-desc">{cat.desc}</p>
                </Motion.div>
              ))}
            </div>
          </Container>
        </section>
      </div>

      <div className="organic-section-bottom">
        <FAQ
          title="Territory Insights"
          subtitle="Common inquiries regarding our destinations and travel protocols."
          items={faqData?.items}
        />

        <CTA
          variant="default"
          title="Your Journey Begins Here"
          description="Our master architects are waiting to craft your legendary expedition. From private conservancies to exclusive heritage sites, your vision is our blueprint."
          primaryAction={{
            label: "Request Custom Design",
            onClick: () => navigateTo("/contact"),
          }}
          secondaryAction={{
            label: "Browse All Tours",
            onClick: () => navigateTo("/tours"),
          }}
        />
      </div>
    </PageShell>
  );
}

export default ArchiveDestinationTemplate;