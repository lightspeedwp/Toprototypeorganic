/**
 * FacilityBadges — Displays facility/amenity badges for a single property.
 *
 * Shows the resolved facility names with Phosphor icons, each linking
 * to the facility taxonomy archive at `/facilities/{slug}`.
 *
 * @module FacilityBadges
 * @category patterns
 */

import { ALL_FACILITIES } from "../../data/mockExpanded";
import {
  Waves,
  Sparkle,
  ForkKnife,
  WifiHigh,
  Wine,
  Binoculars,
  Sailboat,
  Baby,
  Barbell,
  TShirt,
  Car,
  Footprints,
  Compass,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { useNavigation } from "../../contexts/NavigationContext";

const ICON_MAP: Record<string, PhosphorIcon> = {
  Waves,
  Sparkles: Sparkle,
  Utensils: ForkKnife,
  Wifi: WifiHigh,
  Wine,
  Binoculars,
  Ship: Sailboat,
  Baby,
  Dumbbell: Barbell,
  Shirt: TShirt,
  Car,
  Footprints,
};

interface FacilityBadgesProps {
  /** Array of facility IDs (e.g. "facility-1", "facility-2"). */
  facilityIds: string[];
  /** Maximum number of badges to show. Defaults to all. */
  limit?: number;
  /** Optional heading override. */
  title?: string;
}

export function FacilityBadges({
  facilityIds,
  limit,
  title = "Estate Facilities",
}: FacilityBadgesProps) {
  const { navigateTo } = useNavigation();

  const resolvedFacilities = facilityIds
    .map((id) => ALL_FACILITIES.find((f) => f.id === id))
    .filter(Boolean) as typeof ALL_FACILITIES;

  const visible = limit ? resolvedFacilities.slice(0, limit) : resolvedFacilities;
  const remaining = limit ? Math.max(0, resolvedFacilities.length - limit) : 0;

  if (visible.length === 0) return null;

  return (
    <div className="wp-pattern-facility-badges">
      <h4 className="wp-pattern-facility-badges__title">{title}</h4>
      <div className="wp-pattern-facility-badges__grid">
        {visible.map((facility) => {
          const IconComp = facility.icon ? ICON_MAP[facility.icon] || Compass : Compass;

          return (
            <button
              key={facility.id}
              type="button"
              className="wp-pattern-facility-badges__badge"
              onClick={() => navigateTo(`/facilities/${facility.slug}`)}
              aria-label={`View all properties with ${facility.name}`}
            >
              <IconComp className="wp-pattern-facility-badges__icon" size={14} />
              <span>{facility.name}</span>
            </button>
          );
        })}
      </div>
      {remaining > 0 && (
        <button
          type="button"
          className="wp-pattern-facility-badges__more"
          onClick={() => navigateTo("/facilities")}
          aria-label={`View all ${resolvedFacilities.length} facilities`}
        >
          +{remaining} more amenities
        </button>
      )}
    </div>
  );
}

export default FacilityBadges;
