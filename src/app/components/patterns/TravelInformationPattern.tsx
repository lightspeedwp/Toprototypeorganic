/**
 * Travel Information Pattern
 * Maps to: patterns/travel-information.php
 * 
 * Displays important travel information for tours
 */

import { Check, X } from '@phosphor-icons/react';

interface TravelInformationPatternProps {
  included?: string[];
  excluded?: string[];
  bestTime?: string;
  difficulty?: string;
  visaInfo?: string;
  healthInfo?: string;
}

export function TravelInformationPattern({
  included = [],
  excluded = [],
  bestTime,
  difficulty,
  visaInfo,
  healthInfo,
}: TravelInformationPatternProps) {
  const hasContent = included.length > 0 || excluded.length > 0 || bestTime || difficulty || visaInfo || healthInfo;

  if (!hasContent) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-gap-lg)]">
      {/* What's Included */}
      {included.length > 0 && (
        <div className="bg-card border border-border rounded-[var(--radius-lg)] p-[var(--spacing-element-xl)] md:p-[var(--spacing-element-2xl)]">
          <h3 className="mb-[var(--spacing-element-md)]">What's Included</h3>
          <ul className="space-y-[var(--spacing-gap-sm)]">
            {included.map((item, idx) => (
              <li key={idx} className="flex items-start gap-[var(--spacing-gap-sm)]">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-muted-foreground text-fluid-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What's Excluded */}
      {excluded.length > 0 && (
        <div className="bg-card border border-border rounded-[var(--radius-lg)] p-[var(--spacing-element-xl)] md:p-[var(--spacing-element-2xl)]">
          <h3 className="mb-[var(--spacing-element-md)]">What's Not Included</h3>
          <ul className="space-y-[var(--spacing-gap-sm)]">
            {excluded.map((item, idx) => (
              <li key={idx} className="flex items-start gap-[var(--spacing-gap-sm)]">
                <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-muted-foreground text-fluid-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional Information */}
      {(bestTime || difficulty || visaInfo || healthInfo) && (
        <div className="bg-card border border-border rounded-[var(--radius-lg)] p-[var(--spacing-element-xl)] md:p-[var(--spacing-element-2xl)] lg:col-span-2">
          <h3 className="mb-[var(--spacing-element-md)]">Important Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-gap-md)]">
            {bestTime && (
              <div>
                <h4 className="mb-[var(--spacing-element-xs)] text-fluid-sm font-[var(--font-weight-medium)]">Best Time to Visit</h4>
                <p className="text-muted-foreground text-fluid-sm m-0">{bestTime}</p>
              </div>
            )}
            {difficulty && (
              <div>
                <h4 className="mb-[var(--spacing-element-xs)] text-fluid-sm font-[var(--font-weight-medium)]">Difficulty Level</h4>
                <p className="text-muted-foreground text-fluid-sm m-0">{difficulty}</p>
              </div>
            )}
            {visaInfo && (
              <div>
                <h4 className="mb-[var(--spacing-element-xs)] text-fluid-sm font-[var(--font-weight-medium)]">Visa Requirements</h4>
                <p className="text-muted-foreground text-fluid-sm m-0">{visaInfo}</p>
              </div>
            )}
            {healthInfo && (
              <div>
                <h4 className="mb-[var(--spacing-element-xs)] text-fluid-sm font-[var(--font-weight-medium)]">Health & Vaccinations</h4>
                <p className="text-muted-foreground text-fluid-sm m-0">{healthInfo}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}