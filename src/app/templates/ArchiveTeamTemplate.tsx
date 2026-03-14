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
import { ArchiveResultsSection } from "../components/patterns/ArchiveResultsSection";
import { ALL_TEAM } from "../data/mockExpanded";
import { CTA_TEAM_ARCHIVE, getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import type { ViewMode } from "../components/patterns/ViewSwitcher";

/**
 * ArchiveTeamTemplate Component.
 */
export function ArchiveTeamTemplate() {
  const { navigateToTeamMember, navigateTo } = useNavigation();
  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");

  // Centralized hero and FAQ data
  const faqData = getPageSectionFAQs("team-archive");

  return (
    <PageShell context="team-archive" as="article" className="wp-template-archive-team theme-organic">
      <div className="organic-section-middle">
        <ArchiveResultsSection
          header={{
            eyebrow: "Expertise",
            title: "Our Specialists",
            description: `Showing ${ALL_TEAM.length} experts ready to help you plan your legendary journey.`,
          }}
          items={ALL_TEAM}
          totalFiltered={ALL_TEAM.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          renderItem={(member, vm) => (
            <TeamCard
              key={member.id}
              member={member}
              layout={vm === "list" ? "horizontal" : "card"}
              onClick={() => navigateToTeamMember(member.slug)}
            />
          )}
          className="py-section-lg"
        />
      </div>

      <div className="organic-section-bottom">
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
          variant="default"
          primaryAction={{ 
            label: "Talk to an Expert",
            onClick: () => navigateTo("/contact")
          }}
          secondaryAction={{ 
            label: "View All Tours",
            onClick: () => navigateTo("/tours")
          }}
        />
      </div>
    </PageShell>
  );
}

export default ArchiveTeamTemplate;