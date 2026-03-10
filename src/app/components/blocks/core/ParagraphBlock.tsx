import { cn } from "../../../lib/utils";

/**
 * ParagraphBlock - Semantic paragraph component
 * 
 * WordPress Equivalent: core/paragraph
 * 
 * CRITICAL: Typography is AUTOMATIC via semantic HTML <p> tag.
 * DO NOT add text-base or font-normal classes.
 * 
 * All typography comes from /src/styles/theme.css:
 * - Font family: Noto Sans (sans-serif)
 * - Font size: 16-18px (fluid via clamp)
 * - Font weight: 400 (normal)
 * - Line height: 1.5
 */

export interface ParagraphBlockProps {
  /** Paragraph text content */
  children: React.ReactNode;
  
  /** Optional custom classes */
  className?: string;
  
  /** Optional size override (rare - use for intentional deviations) */
  size?: 'sm' | 'base' | 'lg';
}

export function ParagraphBlock({ 
  children, 
  className, 
  size = 'base' 
}: ParagraphBlockProps) {
  return (
    <p 
      className={cn("text-center m-[0px]", 
// ONLY apply size classes if intentionally overriding defaults
size === 'sm' && 'text-sm', size === 'lg' && 'text-lg', className)}
    >
      {children}
    </p>
  );
}
