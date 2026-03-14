/**
 * Archive Header Pattern - WordPress BEM CSS Version
 * 
 * Displays a page header for archive, taxonomy, and listing pages
 * without a background image.
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { cn } from "../../lib/utils";

/**
 * Props for the ArchiveHeader component.
 */
interface ArchiveHeaderProps {
  /** Main page title (rendered as H1) */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional context label above title */
  context?: string;
  /** Optional item count to display */
  itemCount?: number;
  /** Additional CSS classes */
  className?: string;
  /** Text alignment */
  textAlign?: "left" | "center";
}

/**
 * Archive Header Pattern Component.
 */
export function ArchiveHeader({ 
  title, 
  description, 
  context, 
  itemCount, 
  className,
  textAlign = "left"
}: ArchiveHeaderProps) {
  const isCenter = textAlign === "center";

  return (
    <header className={cn("wp-pattern-archive-header", className)}>
      <Container>
        <div className={cn("wp-pattern-archive-header__content flex flex-col gap-element-sm", isCenter ? "items-center text-center" : "items-start text-left")}>
          {context && (
            <p className="wp-pattern-archive-header__meta-item m-0 font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] uppercase tracking-wider font-[weight:var(--font-weight-bold)]">
              {context}
            </p>
          )}
          
          <h1 className="wp-pattern-archive-header__title m-0 font-[family:var(--font-family-lora)] text-[length:var(--text-4xl)] md:text-[length:var(--text-5xl)] text-[color:var(--color-foreground)]">
            {title}
          </h1>
          
          {description && (
            <p className="wp-pattern-archive-header__description m-0 font-[family:var(--font-family-noto-sans)] text-[length:var(--text-lg)] text-[color:var(--color-muted-foreground)] max-w-[800px]">
              {description}
            </p>
          )}
          
          {itemCount !== undefined && (
            <p className="wp-pattern-archive-header__count m-0 font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] text-[color:var(--color-primary)] font-[weight:var(--font-weight-medium)]">
              {itemCount} {itemCount === 1 ? 'Available Result' : 'Available Results'}
            </p>
          )}
        </div>
      </Container>
    </header>
  );
}

export default ArchiveHeader;