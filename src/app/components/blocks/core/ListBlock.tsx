import { cn } from "../../../lib/utils";
import { Check, X, CaretRight as ChevronRight } from "@phosphor-icons/react";

/**
 * ListBlock - Semantic list component
 * 
 * WordPress Equivalent: core/list
 * 
 * Features:
 * - Ordered and unordered lists
 * - Custom markers (checkmark, X, arrow)
 * - Automatic typography from theme.css
 */

export interface ListBlockProps {
  /** List items */
  items: string[] | React.ReactNode[];
  
  /** List type */
  ordered?: boolean;
  
  /** Optional custom classes */
  className?: string;
  
  /** Custom marker icon */
  marker?: 'default' | 'checkmark' | 'x' | 'arrow';
}

export function ListBlock({ 
  items, 
  ordered = false, 
  className,
  marker = 'default'
}: ListBlockProps) {
  const Tag = ordered ? 'ol' : 'ul';
  
  const renderMarker = () => {
    if (marker === 'checkmark') {
      return <Check className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />;
    }
    if (marker === 'x') {
      return <X className="w-4 h-4 text-destructive flex-shrink-0" aria-hidden="true" />;
    }
    if (marker === 'arrow') {
      return <ChevronRight className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />;
    }
    return null;
  };
  
  const hasCustomMarker = marker !== 'default';
  
  return (
    <Tag 
      className={cn(
        "flex flex-col gap-2 pb-element-md",
        !hasCustomMarker && ordered && "list-decimal list-inside",
        !hasCustomMarker && !ordered && "list-disc list-inside",
        hasCustomMarker && "list-none",
        className
      )}
    >
      {items.map((item, index) => (
        <li 
          key={index}
          className={cn(
            hasCustomMarker && "flex items-start gap-2"
          )}
        >
          {hasCustomMarker && renderMarker()}
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </Tag>
  );
}