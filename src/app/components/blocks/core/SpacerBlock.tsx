import { cn } from "../../../lib/utils";

/**
 * SpacerBlock - Vertical spacing component
 * 
 * WordPress Equivalent: core/spacer
 * 
 * Features:
 * - Predefined height values from Tailwind scale
 * - Maps to CSS variable spacing
 * - Accessible (aria-hidden for decorative spacing)
 */

export interface SpacerBlockProps {
  /** Height preset */
  height?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Optional custom classes */
  className?: string;
}

const spacingMap = {
  xs: 'h-4',   // 16px
  sm: 'h-8',   // 32px
  md: 'h-12',  // 48px
  lg: 'h-16',  // 64px
  xl: 'h-24',  // 96px
};

export function SpacerBlock({ height = 'md', className }: SpacerBlockProps) {
  return (
    <div 
      className={cn(spacingMap[height], className)} 
      aria-hidden="true" 
    />
  );
}
