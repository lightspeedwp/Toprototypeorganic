/**
 * Fast Facts Tour Part
 * Maps to: parts/fast-facts-tour.html
 * 
 * Quick reference facts for tour details
 */

import { Calendar, MapPin, Users, CurrencyDollar as DollarSign, TrendUp as TrendingUp, Sun } from '@phosphor-icons/react';
import type { Tour } from '../../data/types';

interface FastFactsTourPartProps {
  tour: Tour;
}

export function FastFactsTourPart({ tour }: FastFactsTourPartProps) {
  const facts = [
    {
      icon: Calendar,
      label: 'Duration',
      value: tour.duration,
    },
    {
      icon: DollarSign,
      label: 'Price',
      value: tour.price,
    },
    {
      icon: Users,
      label: 'Group Size',
      value: tour.groupSize,
    },
    {
      icon: TrendingUp,
      label: 'Difficulty',
      value: tour.difficulty,
    },
    {
      icon: Sun,
      label: 'Best Time',
      value: tour.bestTime,
    },
    {
      icon: MapPin,
      label: 'Destinations',
      value: `${tour.destinations.length} destination${tour.destinations.length !== 1 ? 's' : ''}`,
    },
  ];

  return (
    <aside
      className="bg-card border border-border rounded-[var(--radius-lg)] p-element-lg md:p-element-xl"
      aria-label="Tour quick facts"
    >
      <h2 className="pb-element-xl">Quick Facts</h2>
      
      <div className="flex flex-col gap-element-md">
        {facts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div key={fact.label} className="flex items-start gap-fluid-sm">
              <div className="wp-icon-container-primary rounded-[var(--radius-md)]">
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-muted-foreground pb-element-xs font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-medium)]">
                  {fact.label}
                </div>
                <div className="font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-semibold)]">
                  {fact.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}