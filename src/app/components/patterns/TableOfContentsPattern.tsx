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
      <li key={s.id} className="list-none">
        <button
          onClick={() => scrollTo(s.id)}
          className={cn(
            "w-full text-left py-2 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-3",
            isActive 
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 translate-x-2" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
            depth > 0 && "ml-6 opacity-80"
          )}
        >
          <ChevronRight className={cn("size-3 shrink-0 transition-transform", isActive ? "rotate-90" : "opacity-30")} />
          <span>{s.label}</span>
        </button>
        {s.children && (
          <ul className="mt-1 space-y-1">
            {s.children.map(c => renderItem(c, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <section className={cn(
      "wp-pattern-lts-toc py-12",
      sticky && "sticky top-24 self-start",
      className
    )}>
      <Container maxWidth="narrow">
        <div className={cn(
          "wp-pattern-lts-toc__card p-8 rounded-2xl border-2 border-border shadow-sm",
          variant === 'minimal' ? "bg-transparent border-none p-0 shadow-none" : "bg-card"
        )}>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <List className="size-5" />
            </div>
            <h2 className="text-xl font-bold mb-0 font-serif">{title}</h2>
          </div>
          
          <nav aria-label="Table of contents">
            <ul className="space-y-2 p-0 m-0">
              {sections.map(s => renderItem(s))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
