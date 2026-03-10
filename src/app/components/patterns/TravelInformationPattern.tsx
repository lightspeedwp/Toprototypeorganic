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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* What's Included */}
      {included.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-5 md:p-6">
          <h3 className="mb-4">What's Included</h3>
          <ul className="space-y-3">
            {included.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-muted-foreground text-fluid-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What's Excluded */}
      {excluded.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-5 md:p-6">
          <h3 className="mb-4">What's Not Included</h3>
          <ul className="space-y-3">
            {excluded.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-muted-foreground text-fluid-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional Information */}
      {(bestTime || difficulty || visaInfo || healthInfo) && (
        <div className="bg-card border border-border rounded-lg p-5 md:p-6 lg:col-span-2">
          <h3 className="mb-4">Important Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bestTime && (
              <div>
                <h4 className="mb-1 text-fluid-sm font-medium">Best Time to Visit</h4>
                <p className="text-muted-foreground text-fluid-sm">{bestTime}</p>
              </div>
            )}
            {difficulty && (
              <div>
                <h4 className="mb-1 text-fluid-sm font-medium">Difficulty Level</h4>
                <p className="text-muted-foreground text-fluid-sm">{difficulty}</p>
              </div>
            )}
            {visaInfo && (
              <div>
                <h4 className="mb-1 text-fluid-sm font-medium">Visa Requirements</h4>
                <p className="text-muted-foreground text-fluid-sm">{visaInfo}</p>
              </div>
            )}
            {healthInfo && (
              <div>
                <h4 className="mb-1 text-fluid-sm font-medium">Health & Vaccinations</h4>
                <p className="text-muted-foreground text-fluid-sm">{healthInfo}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
