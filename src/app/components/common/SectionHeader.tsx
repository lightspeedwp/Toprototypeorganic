/**
 * Reusable Section Header component with eyebrow, title, and description.
 * 
 * @module SectionHeader
 * @category components/common
 */

import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { cn } from "../../lib/utils";

export interface SectionHeaderProps {
  section: {
    eyebrow?: string;
    title: string;
    description: string;
  };
  icon?: PhosphorIcon;
  prefix?: string;
  centered?: boolean;
  className?: string;
}

/**
 * SectionHeader Component.
 */
export function SectionHeader({
  section,
  icon: Icon,
  prefix = "wp-section",
  centered = false,
  className
}: SectionHeaderProps) {
  return (
    <header 
      className={cn(
        `${prefix}-header`, 
        centered && `${prefix}-header--centered`,
        className
      )}
    >
      {section.eyebrow && (
        <div className={`${prefix}-eyebrow`}>
          {Icon && <Icon className={`${prefix}-eyebrow-icon`} />}
          <span className={`${prefix}-eyebrow-text`}>
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