import type { TeamRole } from "../types";

/**
 * Team Role taxonomy terms.
 *
 * 6 roles covering all organisational functions.
 *
 * @module team-roles
 * @category data/taxonomies
 * @wordpressTaxonomy team_role
 */
export const TEAM_ROLES: TeamRole[] = [
  {
    id: "role-1",
    slug: "management",
    name: "Management",
    description: "Our leadership team guiding the company vision.",
    memberIds: ["team-2", "team-6", "team-7"],
  },
  {
    id: "role-2",
    slug: "consultant",
    name: "Travel Consultants",
    description: "Expert planners who design your dream journey.",
    memberIds: ["team-1", "team-3", "team-4", "team-8", "team-9", "team-10"],
  },
  {
    id: "role-3",
    slug: "guide",
    name: "Guides",
    description: "Professional guides who lead our tours on the ground.",
    memberIds: ["team-5", "team-11", "team-12", "team-13"],
  },
  {
    id: "role-4",
    slug: "operations",
    name: "Operations",
    description: "The team ensuring seamless logistics behind the scenes.",
    memberIds: ["team-2", "team-14"],
  },
  {
    id: "role-5",
    slug: "marketing",
    name: "Marketing & Content",
    description: "Brand storytelling, photography, and digital outreach.",
    memberIds: ["team-15", "team-16"],
  },
  {
    id: "role-6",
    slug: "reservations",
    name: "Reservations",
    description: "Booking coordination, rate management, and guest services.",
    memberIds: ["team-17", "team-18"],
  },
];

/**
 * Get team role by slug
 */
export function getTeamRole(slug: string): TeamRole | undefined {
  return TEAM_ROLES.find(r => r.slug === slug);
}

/**
 * Get team role by ID
 */
export function getTeamRoleById(id: string): TeamRole | undefined {
  return TEAM_ROLES.find(r => r.id === id);
}
