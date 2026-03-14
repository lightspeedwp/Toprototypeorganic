/**
 * FacilityChips — Toggleable facility/amenity filter chips.
 *
 * Displays a horizontal row of pill-shaped toggles for filtering
 * accommodation by facility. Maps to WordPress taxonomy filter
 * pattern for the Facility taxonomy.
 *
 * @module FacilityChips
 * @category patterns
 */

import { FACILITIES } from "../../data/taxonomies/facilities";
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
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

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

interface FacilityChipsProps {
  /** Currently selected facility IDs. */
  selected: string[];
  /** Toggle callback — receives the facility ID. */
  onToggle: (facilityId: string) => void;
}

export function FacilityChips({ selected, onToggle }: FacilityChipsProps) {
  return (
    <div className="wp-pattern-facility-chips" role="group" aria-label="Filter by facility">
      <span className="wp-pattern-facility-chips__label">Amenities:</span>
      <div className="wp-pattern-facility-chips__list">
        {FACILITIES.map((facility) => {
          const isActive = selected.includes(facility.id);
          const IconComp = facility.icon ? ICON_MAP[facility.icon] : null;

          return (
            <button
              key={facility.id}
              type="button"
              className={`wp-pattern-facility-chips__chip${isActive ? " wp-pattern-facility-chips__chip--active" : ""}`}
              onClick={() => onToggle(facility.id)}
              aria-pressed={isActive}
              aria-label={`${isActive ? "Remove" : "Add"} ${facility.name} filter`}
            >
              {IconComp && <IconComp size={14} weight={isActive ? "bold" : "regular"} />}
              <span>{facility.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FacilityChips;