/**
 * Dress Block Component
 * 
 * Provides clothing recommendations for destinations.
 * Helps travellers pack appropriately for climate and cultural sites.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/dress
 * - Category: Tour Operator
 * - Used on destination pages where specific dress guidance is needed
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module Dress
 * @category blocks/tour-operator
 */

import React from 'react';
import { TShirt } from '@phosphor-icons/react';

/**
 * Dress block props.
 */
export interface DressProps {
  /** Dress recommendations text or HTML */
  content: string;
  
  /** Optional title for the section */
  title?: string;
  
  /** Whether to show dress icon */
  showIcon?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Dress Block component.
 * 
 * Displays clothing recommendations for a destination.
 * 
 * @component
 * @category blocks/tour-operator
 * 
 * @example
 * ```tsx
 * <Dress
 *   title="What to Wear"
 *   content="Pack light, breathable clothing for warm days and a jacket for cool evenings."
 *   showIcon={true}
 * />
 * ```
 * 
 * @param {DressProps} props - Component props
 * @returns {JSX.Element} Rendered dress block
 */
export function Dress({
  content,
  title = 'Dress Code',
  showIcon = true,
  className = '',
}: DressProps) {
  if (!content) {
    return null;
  }

  return (
    <div className={`${className}`} aria-label="Dress recommendations">
      {/* Title */}
      <div className="flex items-center gap-2 mb-3">
        {showIcon && (
          <TShirt className="w-5 h-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
        )}
        <h3>
          {title}
        </h3>
      </div>

      {/* Content */}
      <div
        className="prose prose-sm max-w-none text-muted-foreground font-sans"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

Dress.displayName = 'Dress';