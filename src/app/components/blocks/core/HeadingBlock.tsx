import { cn } from "../../../lib/utils";

/**
 * HeadingBlock - Semantic heading component
 * 
 * WordPress Equivalent: core/heading
 * 
 * CRITICAL: Typography is AUTOMATIC via semantic HTML.
 * DO NOT add Tailwind classes like text-4xl, font-bold, etc.
 * 
 * All typography comes from /src/styles/theme.css:
 * - h1: 48-72px (fluid), Lora, 700 weight
 * - h2: 30-48px (fluid), Lora, 600 weight
 * - h3: 24-36px (fluid), Lora, 600 weight
 * - h4: 20-30px (fluid), Lora, 500 weight
 * - h5: 18-24px (fluid), Lora, 500 weight
 * - h6: 16-20px (fluid), Lora, 500 weight
 */

export interface HeadingBlockProps {
  /** Heading level (1-6) */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  
  /** Heading text content */
  children: React.ReactNode;
  
  /** Optional custom classes (use sparingly) */
  className?: string;
  
  /** Optional ID for anchor links */
  id?: string;
  
  /** Optional text alignment override */
  textAlign?: 'left' | 'center' | 'right';
}

export function HeadingBlock({ 
  level, 
  children, 
  className,
  id,
  textAlign
}: HeadingBlockProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag 
      id={id} 
      className={cn(
        textAlign && `text-${textAlign}`,
        className
      )}
    >
      {children}
    </Tag>
  );
}
