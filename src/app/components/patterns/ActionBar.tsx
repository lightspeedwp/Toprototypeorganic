/**
 * ActionBar Pattern Component - WordPress BEM CSS Version
 * 
 * Horizontal action bar for filters, sorting, and contextual actions.
 * 
 * @module ActionBar
 * @category patterns
 */

import React from 'react';
import { Row } from '../blocks/design';
import { cn } from '../../lib/utils';

export interface ActionBarProps {
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  align?: 'start' | 'center' | 'end' | 'baseline';
  gap?: '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';
  stackOnMobile?: boolean;
  variant?: 'default' | 'muted' | 'bordered';
  className?: string;
}

export function ActionBar({
  leftContent,
  centerContent,
  rightContent,
  align = 'center',
  gap = '4',
  stackOnMobile = true,
  variant = 'default',
  className,
}: ActionBarProps) {
  const variantClasses = {
    default: '',
    muted: 'bg-muted/50 p-[var(--spacing-element-md)] rounded-[var(--radius-xl)] border border-border/50',
    bordered: 'border-b border-border pb-[var(--spacing-element-lg)]',
  };

  return (
    <div className={cn("wp-pattern-action-bar", variantClasses[variant], className)}>
      <Row
        gap={gap}
        justify="between"
        align={align}
        wrap={stackOnMobile}
      >
        {/* Left Column */}
        {leftContent && (
          <div className="flex-shrink-0 flex items-center">
            {leftContent}
          </div>
        )}
        
        {/* Center Column */}
        {centerContent && (
          <div className="flex-grow flex items-center justify-center">
            {centerContent}
          </div>
        )}
        
        {/* Right Column */}
        {rightContent && (
          <div className="flex-shrink-0 flex items-center gap-[var(--spacing-gap-sm)]">
            {rightContent}
          </div>
        )}
      </Row>
    </div>
  );
}
