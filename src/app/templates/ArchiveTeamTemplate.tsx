/**
 * Archive Team Template - Content Hub Archetype
 * 
 * Displays archive of all team members.
 * Strictly adheres to design system tokens and BEM naming.
 * 
 * @module ArchiveTeamTemplate
 * @category templates
 */

import { useState } from "react";
import { PageShell } from "../components/parts/PageShell";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { TeamCard } from "../components/patterns/TeamCard";
import { ViewSwitcher, type ViewMode } from "../components/patterns/ViewSwitcher";
import { Container } from "../components/common/Container";
import { SectionHeader } from "../components/common/SectionHeader";
import { ALL_TEAM } from "../data/mockExpanded";
import { CTA_TEAM_ARCHIVE, getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";

/**
 * ArchiveTeamTemplate Component.
 */
export function ArchiveTeamTemplate() {
  const { navigateToTeamMember, navigateTo } = useNavigation();
  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");

  // Centralized hero and FAQ data
  const faqData = getPageSectionFAQs("team-archive");

  return (
    <PageShell context="team-archive" as="article" className="wp-template-archive-team">
      {/* Content Section */}
      <section className="wp-template-archive__content py-section-lg">
        <Container>
          {/* Results Header */}
          <div className="wp-template-archive__results-header">
            <SectionHeader
              section={{
                eyebrow: "Expertise",
                title: "Our Specialists",
                description: `Showing ${ALL_TEAM.length} experts ready to help you plan your legendary journey.`
              }}
              centered={false}
              className="m-0"
            />
            <ViewSwitcher currentView={viewMode} onViewChange={setViewMode} />
          </div>

          {/* Team Grid */}
          <div className={viewMode === "list" ? "wp-template-archive__list" : "wp-template-archive__grid wp-template-archive__grid--cols-3"}>
            {ALL_TEAM.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                layout={viewMode === "list" ? "horizontal" : "card"}
                onClick={() => navigateToTeamMember(member.slug)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQ
        items={faqData?.items}
        title={faqData?.sectionTitle || "Expert Guidance FAQ"}
        intro={faqData?.sectionDescription || "How our specialists can help you plan the perfect safari"}
      />

      {/* CTA */}
      <CTA
        title={CTA_TEAM_ARCHIVE.title}
        description={CTA_TEAM_ARCHIVE.description}
        variant="gradient"
        primaryAction={{ 
          label: "Talk to an Expert",
          onClick: () => navigateTo("/contact")
        }}
        secondaryAction={{ 
          label: "View All Tours",
          onClick: () => navigateTo("/tours")
        }}
      />
    </PageShell>
  );
}

export default ArchiveTeamTemplate;