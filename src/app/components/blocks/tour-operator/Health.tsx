/**
 * Health Block Component
 * 
 * Displays health and medical information for a destination.
 * Includes vaccination requirements, precautions and emergency contacts.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/health
 * - Category: Tour Operator
 * - Used on destination pages or within travel guides
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module Health
 * @category blocks/tour-operator
 */

import React from 'react';
import { Heartbeat as HeartPulse } from '@phosphor-icons/react';

/**
 * Health block props.
 */
export interface HealthProps {
  /** Heading for the health section */
  title?: string;
  
  /** Health information text or HTML */
  content: string;
  
  /** Whether to show health icon */
  showIcon?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Health Block component.
 * 
 * Displays health advisories and medical information.
 * 
 * @component
 * @category blocks/tour-operator
 * 
 * @example
 * ```tsx
 * <Health
 *   title="Health & Safety"
 *   content="<p>Yellow fever vaccination required. Malaria prophylaxis recommended.</p>"
 *   showIcon={true}
 * />
 * ```
 * 
 * @param {HealthProps} props - Component props
 * @returns {JSX.Element} Rendered health block
 */
export function Health({
  title = 'Health & Safety',
  content,
  showIcon = true,
  className = '',
}: HealthProps) {
  if (!content) {
    return null;
  }

  return (
    <div className={`${className}`} aria-label="Health information">
      {/* Title */}
      <div className="flex items-center gap-fluid-xs pb-element-md">
        {showIcon && (
          <HeartPulse className="w-5 h-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
        )}
        <h3>
          {title}
        </h3>
      </div>

      {/* Content */}
      <div
        className="prose prose-sm max-w-none text-muted-foreground font-[family-name:var(--font-family-noto-sans)]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

Health.displayName = 'Health';