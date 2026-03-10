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
    <aside className="wp-bg-muted-light border border-border rounded-lg p-5" aria-label="Destination information">
      <h2 className="mb-4">Quick Facts</h2>
      
      <dl className="space-y-4">
        {/* Best Time to Visit */}
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <dt className="text-muted-foreground mb-1 font-sans text-sm">Best Time to Visit</dt>
            <dd className="font-sans text-sm font-medium">{destination.bestTime}</dd>
          </div>
        </div>

        {/* Climate */}
        <div className="flex items-start gap-3">
          <CloudSun className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <dt className="text-muted-foreground mb-1 font-sans text-sm">Climate</dt>
            <dd className="font-sans text-sm font-medium">{destination.climate}</dd>
          </div>
        </div>

        {/* Currency */}
        <div className="flex items-start gap-3">
          <DollarSign className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <dt className="text-muted-foreground mb-1 font-sans text-sm">Currency</dt>
            <dd className="font-sans text-sm font-medium">{destination.currency}</dd>
          </div>
        </div>

        {/* Language */}
        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <dt className="text-muted-foreground mb-1 font-sans text-sm">Language</dt>
            <dd className="font-sans text-sm font-medium">{destination.language}</dd>
          </div>
        </div>

        {/* Timezone */}
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <dt className="text-muted-foreground mb-1 font-sans text-sm">Timezone</dt>
            <dd className="font-sans text-sm font-medium">{destination.timezone}</dd>
          </div>
        </div>

        {/* Highlights */}
        {destination.highlights.length > 0 && (
          <>
            <div className="pt-4 border-t border-border">
              <dt className="text-muted-foreground mb-3 flex items-center gap-2 font-sans text-sm">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Top Highlights
              </dt>
              <dd>
                <ul className="space-y-2 font-sans text-sm" role="list">
                  {destination.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary shrink-0 mt-1">•</span>
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