/**
 * Travel Information Pattern
 * Maps to: patterns/travel-information.php
 * 
 * Displays important travel information for tours
 */

import { Check, X, Globe, Heart } from '@phosphor-icons/react';

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-fluid-lg">
      {/* What's Included */}
      {included.length > 0 && (
        <div className="bg-[color:var(--color-card)] border border-[color:var(--color-border)] rounded-[var(--radius-lg)] p-element-xl md:p-element-2xl flex flex-col gap-element-md">
          <h3 className="m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)]">What's Included</h3>
          <ul className="flex flex-col gap-fluid-sm m-0 p-0">
            {included.map((item, idx) => (
              <li key={idx} className="flex items-start gap-fluid-sm">
                <Check className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)] text-[color:var(--color-primary)] flex-shrink-0" aria-hidden="true" />
                <span className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What's Excluded */}
      {excluded.length > 0 && (
        <div className="bg-[color:var(--color-card)] border border-[color:var(--color-border)] rounded-[var(--radius-lg)] p-element-xl md:p-element-2xl flex flex-col gap-element-md">
          <h3 className="m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)]">What's Not Included</h3>
          <ul className="flex flex-col gap-fluid-sm m-0 p-0">
            {excluded.map((item, idx) => (
              <li key={idx} className="flex items-start gap-fluid-sm">
                <X className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)] text-[color:var(--color-destructive)] flex-shrink-0" aria-hidden="true" />
                <span className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional Information */}
      {(bestTime || difficulty || visaInfo || healthInfo) && (
        <div className="bg-[color:var(--color-card)] border border-[color:var(--color-border)] rounded-[var(--radius-lg)] p-element-xl md:p-element-2xl lg:col-span-2 flex flex-col gap-element-md">
          <h3 className="m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)]">Important Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-md">
            {bestTime && (
              <div className="flex flex-col gap-element-xs">
                <h4 className="m-0 text-fluid-sm font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)]">Best Time to Visit</h4>
                <p className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-fluid-sm m-0">{bestTime}</p>
              </div>
            )}
            {difficulty && (
              <div className="flex flex-col gap-element-xs">
                <h4 className="m-0 text-fluid-sm font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)]">Difficulty Level</h4>
                <p className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-fluid-sm m-0">{difficulty}</p>
              </div>
            )}
            {visaInfo && (
              <div className="flex flex-col gap-element-xs">
                <h4 className="flex items-center gap-fluid-sm !m-0 text-fluid-sm font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)]">
                  <Globe className="w-5 h-5 text-[color:var(--color-primary)]" />
                  Visa Requirements
                </h4>
                <p className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-fluid-sm m-0">{visaInfo}</p>
              </div>
            )}
            {healthInfo && (
              <div className="flex flex-col gap-element-xs">
                <h4 className="flex items-center gap-fluid-sm !m-0 text-fluid-sm font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)]">
                  <Heart className="w-5 h-5 text-[color:var(--color-primary)]" />
                  Health & Vaccinations
                </h4>
                <p className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-fluid-sm m-0">{healthInfo}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}