/**
 * Team section for the homepage.
 *
 * This section introduces the team members on the front page.
 * Refactored to use FeaturedSection wrapper.
 *
 * **WordPress CSS:**
 * Uses BEM classes for consistent styling:
 * - .wp-template-home__team
 * - .wp-template-home__team-grid
 *
 * @module TeamSection
 * @category components/patterns/homepage
 */

import { FeaturedSection } from "../FeaturedSection";
import { TeamCard } from "../TeamCard";
import { Users } from "@phosphor-icons/react";
import type { TeamMember } from "../../../data/types";

/**
 * Props for the TeamSection component.
 */
interface TeamSectionProps {
  /** Array of team member objects to display. */
  team: TeamMember[];
  /** Section header data (eyebrow, title, description). */
  section: {
    eyebrow?: string;
    title: string;
    description: string;
    viewAllLabel?: string;
    viewAllHref?: string;
  };
  /** Callback for navigation. */
  onNavigate: (path: string) => void;
}

/**
 * TeamSection Component.
 */
export function TeamSection({ team, section, onNavigate }: TeamSectionProps) {
  return (
    <FeaturedSection
      className="wp-template-home__team"
      header={{
        eyebrow: section.eyebrow,
        title: section.title,
        description: section.description,
        icon: Users,
        prefix: "wp-template-home__section",
      }}
      items={team}
      gridClassName="wp-featured-section__grid--cols-3"
      renderCard={(member) => (
        <TeamCard
          member={member}
          onClick={() => onNavigate("/team/" + member.slug)}
        />
      )}
      viewAll={
        section.viewAllLabel && section.viewAllHref
          ? {
              label: section.viewAllLabel,
              onClick: () => onNavigate(section.viewAllHref!),
              variant: "outline",
            }
          : undefined
      }
    />
  );
}

export default TeamSection;
