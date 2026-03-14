/**
 * Fast Facts Destination Part
 * Maps to: parts/fast-facts-destination.html
 * 
 * Sidebar component displaying key destination information
 */

import { 
  Calendar, 
  CloudSun, 
  CurrencyDollar as DollarSign, 
  Globe, 
  Clock,
  MapPin
} from '@phosphor-icons/react';
import type { Destination } from '../../data/types';

interface FastFactsDestinationPartProps {
  destination: Destination;
}

export function FastFactsDestinationPart({ destination }: FastFactsDestinationPartProps) {
  return (
    <aside className="wp-bg-muted-light border border-border rounded-[var(--radius-lg)] p-element-xl" aria-label="Destination information">
      <h2 className="pb-element-lg">Quick Facts</h2>
      
      <dl className="flex flex-col gap-element-md">
        {/* Best Time to Visit */}
        <div className="flex items-start gap-fluid-sm">
          <Calendar className="w-5 h-5 text-primary shrink-0 translate-y-px" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <dt className="text-muted-foreground pb-element-xs font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">Best Time to Visit</dt>
            <dd className="font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-medium)]">{destination.bestTime}</dd>
          </div>
        </div>

        {/* Climate */}
        <div className="flex items-start gap-fluid-sm">
          <CloudSun className="w-5 h-5 text-primary shrink-0 translate-y-px" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <dt className="text-muted-foreground pb-element-xs font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">Climate</dt>
            <dd className="font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-medium)]">{destination.climate}</dd>
          </div>
        </div>

        {/* Currency */}
        <div className="flex items-start gap-fluid-sm">
          <DollarSign className="w-5 h-5 text-primary shrink-0 translate-y-px" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <dt className="text-muted-foreground pb-element-xs font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">Currency</dt>
            <dd className="font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-medium)]">{destination.currency}</dd>
          </div>
        </div>

        {/* Language */}
        <div className="flex items-start gap-fluid-sm">
          <Globe className="w-5 h-5 text-primary shrink-0 translate-y-px" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <dt className="text-muted-foreground pb-element-xs font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">Language</dt>
            <dd className="font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-medium)]">{destination.language}</dd>
          </div>
        </div>

        {/* Timezone */}
        <div className="flex items-start gap-fluid-sm">
          <Clock className="w-5 h-5 text-primary shrink-0 translate-y-px" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <dt className="text-muted-foreground pb-element-xs font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">Timezone</dt>
            <dd className="font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-medium)]">{destination.timezone}</dd>
          </div>
        </div>

        {/* Highlights */}
        {destination.highlights.length > 0 && (
          <>
            <div className="pt-element-lg border-t border-border">
              <dt className="text-muted-foreground pb-element-md flex items-center gap-fluid-xs font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Top Highlights
              </dt>
              <dd>
                <ul className="flex flex-col gap-element-sm font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)]" role="list">
                  {destination.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-fluid-xs">
                      <span className="text-[color:var(--color-primary)] shrink-0 pt-element-xs">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </>
        )}
      </dl>
    </aside>
  );
}