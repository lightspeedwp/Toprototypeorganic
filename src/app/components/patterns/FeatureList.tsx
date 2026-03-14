/**
 * FeatureList Pattern Component - WordPress BEM CSS Version
 * 
 * Vertical list of features or benefits using high-impact icons and typography.
 * 
 * @module FeatureList
 * @category patterns
 */

import React, { isValidElement, type ReactNode, type ComponentType } from 'react';
import { Stack } from '../blocks/design';
import { cn } from '../../lib/utils';

export interface Feature {
  icon: ReactNode | ComponentType<any>;
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
        // Handle both JSX elements and component references
        const renderIcon = () => {
          if (isValidElement(feature.icon)) return feature.icon;
          if (typeof feature.icon === 'function') {
            const IconComponent = feature.icon as ComponentType<any>;
            return (
              <IconComponent
                className={cn(iconSizeClasses[iconSize], iconColorClasses[iconColor], "transition-transform group-hover:scale-110")}
                aria-hidden="true"
              />
            );
          }
          return null;
        };
        
        return (
          <div key={index} className="flex gap-fluid-lg group">
            {/* Icon Wrapper */}
            <div className="flex-shrink-0">
              <div className={cn(
                "rounded-[var(--radius-xl)] bg-[color:var(--color-muted)] group-hover:bg-[color:var(--color-primary)]/5 transition-colors flex items-center justify-center",
                iconSize === 'sm' ? "w-[var(--spacing-element-xl)] h-[var(--spacing-element-xl)]" : iconSize === 'md' ? "w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]" : "w-[var(--spacing-element-4xl)] h-[var(--spacing-element-4xl)]"
              )}>
                {renderIcon()}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 flex flex-col gap-fluid-sm">
              <h3 className="m-0 font-[family:var(--font-family-lora)] text-[length:var(--text-xl)] group-hover:text-[color:var(--color-primary)] transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] leading-relaxed m-0">
                {feature.description}
              </p>
              
              {feature.link && (
                <a
                  href={feature.link.href}
                  className="inline-flex items-center text-[color:var(--color-primary)] hover:underline text-[length:var(--text-sm)] gap-fluid-xs group/link font-[weight:var(--font-weight-medium)] font-[family:var(--font-family-noto-sans)]"
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