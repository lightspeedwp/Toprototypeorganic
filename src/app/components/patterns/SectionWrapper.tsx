/**
 * SectionWrapper Pattern - WordPress BEM CSS Version
 * 
 * Reusable section wrapper using the Group block with common section styles.
 * Provides consistent spacing, backgrounds, and semantic HTML for page sections.
 * 
 * **Features:**
 * - Semantic section HTML
 * - Multiple style variants (default, muted, primary, accent, dark)
 * - Responsive spacing options
 * - Optional width constraints via Container
 * - Accessibility support (ARIA labels, IDs)
 * 
 * **WordPress Mapping:**
 * 
 * Equivalent to core/group block with section styling.
 * Maps to:
 * - core/group (with section tag)
 * - Section preset styles
 * 
 * **Design System:**
 * - Typography: Inherits from content via CSS
 * - Colors: Semantic background tokens
 * - Spacing: Fluid responsive spacing
 * 
 * **CSS:**
 * Styles defined in /src/styles/patterns/section-wrapper.css
 * Uses WordPress BEM methodology: .wp-pattern-section__*
 * 
 * @module SectionWrapper
 * @category patterns
 */

import React from 'react';
import { Group } from '../blocks/design';
import { Container } from '../common/Container';
import { cn } from '../../lib/utils';

/**
 * Section wrapper props.
 */
export interface SectionWrapperProps {
  /** Section style variant */
  variant?: 'default' | 'muted' | 'primary' | 'accent' | 'dark';
  
  /** Vertical spacing size */
  spacing?: 'small' | 'medium' | 'large' | 'xlarge';
  
  /** Constrain content width */
  constrained?: boolean;
  
  /** Section ID for anchor links */
  id?: string;
  
  /** ARIA label for accessibility */
  ariaLabel?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Section content */
  children: React.ReactNode;
}

/**
 * SectionWrapper pattern component.
 * 
 * Creates semantic page sections with consistent styling, spacing,
 * and optional width constraints.
 * 
 * @component
 * @category patterns
 * 
 * @example
 * // Muted section with large spacing
 * <SectionWrapper variant="muted" spacing="large">
 *   <h2>Features</h2>
 *   <CardGrid>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </CardGrid>
 * </SectionWrapper>
 * 
 * @example
 * // Primary section with constrained width
 * <SectionWrapper variant="primary" spacing="xlarge" constrained>
 *   <h2>Call to Action</h2>
 *   <p>Compelling message...</p>
 *   <button>Get Started</button>
 * </SectionWrapper>
 */
export function SectionWrapper({
  variant = 'default',
  spacing = 'medium',
  constrained = true,
  id,
  ariaLabel,
  className,
  children,
}: SectionWrapperProps) {
  const content = constrained ? (
    <Container>{children}</Container>
  ) : (
    children
  );

  return (
    <Group
      as="section"
      id={id}
      ariaLabel={ariaLabel}
      className={cn(
        'wp-pattern-section',
        `wp-pattern-section--${variant}`,
        `wp-pattern-section--${spacing}`,
        className
      )}
    >
      {content}
    </Group>
  );
}

SectionWrapper.displayName = 'SectionWrapper';
