/**
 * Reusable Section Header component with eyebrow, title, and description.
 * 
 * @module SectionHeader
 * @category components/common
 */

import { isValidElement, type ReactNode, type ComponentType } from "react";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { cn } from "../../lib/utils";

export interface SectionHeaderProps {
  section: {
    eyebrow?: string;
    title: string;
    description: string;
  };
  icon?: ReactNode | ComponentType<any>;
  prefix?: string;
  centered?: boolean;
  className?: string;
}

/**
 * SectionHeader Component.
 */
export function SectionHeader({
  section,
  icon,
  prefix = "wp-section",
  centered = false,
  className
}: SectionHeaderProps) {
  // Handle both JSX elements and component references
  const renderIcon = () => {
    if (!icon) return null;
    if (isValidElement(icon)) return icon;
    if (typeof icon === 'function') {
      const IconComponent = icon as ComponentType<any>;
      return <IconComponent className={`${prefix}-eyebrow-icon`} />;
    }
    return null;
  };

  return (
    <header 
      className={cn(
        `${prefix}-header flex flex-col gap-element-md`, 
        centered && `${prefix}-header--centered items-center text-center`,
        className
      )}
    >
      {section.eyebrow && (
        <div className={`${prefix}-eyebrow flex items-center justify-center gap-fluid-sm m-0`}>
          {renderIcon()}
          <span className={`${prefix}-eyebrow-text font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-semibold)] text-[color:var(--color-primary)]`}>
            {section.eyebrow}
          </span>
        </div>
      )}
      
      <HeadingBlock 
        level={2} 
        className={`${prefix}-title`}
        textAlign="center"
      >
        {section.title}
      </HeadingBlock>

      {section.description && (
        <ParagraphBlock 
          className={`${prefix}-description`}
        >
          {section.description}
        </ParagraphBlock>
      )}
    </header>
  );
}

export default SectionHeader;