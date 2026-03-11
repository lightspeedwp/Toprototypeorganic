/**
 * FeatureList Pattern Component - WordPress BEM CSS Version
 * 
 * Vertical list of features or benefits using high-impact icons and typography.
 * 
 * @module FeatureList
 * @category patterns
 */

import React from 'react';
import { Stack } from '../blocks/design';
import { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

export interface Feature {
  icon: PhosphorIcon;
  title: string;
  description: string;
  link?: {
    label: string;
    href: string;
  };
}

export interface FeatureListProps {
  features: Feature[];
  gap?: '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';
  iconSize?: 'sm' | 'md' | 'lg';
  iconColor?: 'primary' | 'secondary' | 'accent' | 'muted';
  className?: string;
}

export function FeatureList({
  features = [],
  gap = '8',
  iconSize = 'md',
  iconColor = 'primary',
  className,
}: FeatureListProps) {
  const iconSizeClasses = {
    sm: 'w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]',
    md: 'w-[var(--spacing-element-lg)] h-[var(--spacing-element-lg)]',
    lg: 'w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]',
  };

  const iconColorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    muted: 'text-muted-foreground',
  };

  return (
    <Stack gap={gap} className={cn("wp-pattern-feature-list", className)}>
      {features.map((feature, index) => {
        const Icon = feature.icon;
        
        return (
          <div key={index} className="flex gap-[var(--spacing-gap-lg)] group">
            {/* Icon Wrapper */}
            <div className="flex-shrink-0 mt-[var(--spacing-element-xs)]">
              <div className={cn(
                "rounded-[var(--radius-xl)] bg-muted group-hover:bg-primary/5 transition-colors flex items-center justify-center",
                iconSize === 'sm' ? "w-[var(--spacing-element-xl)] h-[var(--spacing-element-xl)]" : iconSize === 'md' ? "w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]" : "w-[var(--spacing-element-4xl)] h-[var(--spacing-element-4xl)]"
              )}>
                <Icon
                  className={cn(iconSizeClasses[iconSize], iconColorClasses[iconColor], "transition-transform group-hover:scale-110")}
                  aria-hidden="true"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h3 className="mb-[var(--spacing-element-xs)] text-[length:var(--text-xl)] group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed m-0">
                {feature.description}
              </p>
              
              {feature.link && (
                <a
                  href={feature.link.href}
                  className="inline-flex items-center mt-[var(--spacing-element-md)] text-primary hover:underline text-[length:var(--text-sm)] gap-[var(--spacing-gap-xs)] group/link font-[var(--font-weight-medium)]"
                >
                  <span>{feature.link.label}</span>
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </a>
              )}
            </div>
          </div>
        );
      })}
    </Stack>
  );
}