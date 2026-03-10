import type { TeamRole } from "../types";

export const TEAM_ROLES: TeamRole[] = [
  {
    id: "role-1",
    slug: "management",
    name: "Management",
    description: "Our leadership team guiding the company vision.",
  },
  {
    id: "role-2",
    slug: "consultant",
    name: "Travel Consultants",
    description: "Expert planners who design your dream safari.",
  },
  {
    id: "role-3",
    slug: "guide",
    name: "Guides",
    description: "Professional guides who lead our safaris on the ground.",
  },
  {
    id: "role-4",
    slug: "operations",
    name: "Operations",
    description: "The team ensuring seamless logistics behind the scenes.",
  },
];

/**
 * Get team role by slug
 */
export function getTeamRole(slug: string): TeamRole | undefined {
  return TEAM_ROLES.find(r => r.slug === slug);
}
