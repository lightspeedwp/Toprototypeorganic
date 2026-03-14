/**
 * Table of Contents Pattern Component
 * 
 * An interactive table of contents with smooth scroll navigation.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState, useEffect } from "react";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { Container } from "../common/Container";
import { List, CaretRight as ChevronRight } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

export interface ToCSection {
  id: string;
  label: string;
  children?: ToCSection[];
}

export interface TableOfContentsPatternProps {
  title?: string;
  sections: ToCSection[];
  sticky?: boolean;
  variant?: "default" | "minimal" | "floating";
  className?: string;
}

export function TableOfContentsPattern({
  title = "In This Section",
  sections,
  sticky = false,
  variant = "default",
  className,
}: TableOfContentsPatternProps) {
  const [activeId, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    const allIds: string[] = [];
    const collectIds = (list: ToCSection[]) => {
      list.forEach((s) => {
        allIds.push(s.id);
        if (s.children) collectIds(s.children);
      });
    };
    collectIds(sections);

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  const renderItem = (s: ToCSection, depth: number = 0) => {
    const isActive = activeId === s.id;
    
    return (
      <li key={s.id} className="list-none flex flex-col gap-fluid-xs">
        <button
          onClick={() => scrollTo(s.id)}
          className={cn(
            "w-full text-left py-element-sm px-element-md rounded-[var(--radius-xl)] font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)] transition-all duration-300 flex items-center gap-fluid-sm",
            isActive 
              ? "bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] shadow-[var(--elevation-lg)] shadow-[color:var(--color-primary)]/20 translate-x-2 font-[weight:var(--font-weight-bold)]" 
              : "text-[color:var(--color-muted-foreground)] hover:bg-[color:var(--color-muted)] hover:text-[color:var(--color-foreground)]",
            depth > 0 && "pl-element-xl opacity-80"
          )}
        >
          <ChevronRight className={cn("w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)] shrink-0 transition-transform", isActive ? "rotate-90" : "opacity-30")} />
          <span>{s.label}</span>
        </button>
        {s.children && (
          <ul className="flex flex-col gap-fluid-xs m-0 p-0">
            {s.children.map(c => renderItem(c, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <section className={cn(
      "wp-pattern-lts-toc py-section-md",
      sticky && "sticky top-[var(--spacing-element-5xl)] self-start",
      className
    )}>
      <Container maxWidth="narrow">
        <div className={cn(
          "wp-pattern-lts-toc__card p-element-xl rounded-[var(--radius-2xl)] border-2 border-[color:var(--color-border)] shadow-[var(--elevation-sm)] flex flex-col gap-element-xl",
          variant === 'minimal' ? "bg-transparent border-none p-0 shadow-none" : "bg-[color:var(--color-card)]"
        )}>
          <div className="flex items-center gap-fluid-md">
            <div className="p-element-sm rounded-[var(--radius-lg)] bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]">
              <List className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" />
            </div>
            <h2 className="m-0 font-[family:var(--font-family-lora)] text-[length:var(--text-xl)]">{title}</h2>
          </div>
          
          <nav aria-label="Table of contents">
            <ul className="flex flex-col gap-fluid-xs p-0 m-0">
              {sections.map(s => renderItem(s))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}