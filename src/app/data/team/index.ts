/**
 * Team Data Module — Aggregates all team member data.
 *
 * Total: 18 team members across 6 roles
 * - Original: 5 members (team-1 to team-5)
 * - Expanded: 13 members (team-6 to team-18)
 *
 * Roles: Management (3), Travel Consultants (6), Guides (4),
 *        Operations (2), Marketing & Content (2), Reservations (2)
 *
 * @module team
 * @category data
 */

export * from "./roles";
export { getTeamMember } from "./members";

import { TEAM_MEMBERS } from "./members";
import { TEAM_MEMBERS_EXPANDED } from "./members-expanded";

/**
 * All team members from all files.
 * 18 total members.
 */
export const ALL_TEAM_MEMBERS = [...TEAM_MEMBERS, ...TEAM_MEMBERS_EXPANDED];

/**
 * Default export aliases — backward-compatible.
 */
export const TEAM_DATA = ALL_TEAM_MEMBERS;
export const TEAM = ALL_TEAM_MEMBERS;

/** Legacy alias for the original 5 */
export { TEAM_MEMBERS } from "./members";

/**
 * Get team member by ID from all files.
 */
export function getTeamMemberById(id: string) {
  return ALL_TEAM_MEMBERS.find(m => m.id === id);
}

/**
 * Get team member by slug from all files.
 */
export function getTeamMemberBySlug(slug: string) {
  return ALL_TEAM_MEMBERS.find(m => m.slug === slug);
}

/**
 * Get team members by role ID.
 */
export function getTeamMembersByRole(roleId: string) {
  return ALL_TEAM_MEMBERS.filter(m => m.roleIds?.includes(roleId));
}

/**
 * Get team members by specialty keyword.
 */
export function getTeamMembersBySpecialty(specialty: string) {
  const lower = specialty.toLowerCase();
  return ALL_TEAM_MEMBERS.filter(m =>
    m.specialties.some(s => s.toLowerCase().includes(lower))
  );
}
