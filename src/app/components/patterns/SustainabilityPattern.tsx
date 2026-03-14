/**
 * Sustainability Pattern Component
 * 
 * Displays conservation projects and sustainability commitments.
 * Strictly adheres to design system tokens and BEM naming.
 * 
 * @module SustainabilityPattern
 * @category patterns
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Shield, Compass, Users, Heart, Leaf, Globe } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import type { ConservationProject, SustainabilityCommitment } from "../../data/sustainability";
import type { ComponentType } from "react";

const ICON_MAP: Record<string, ComponentType<any>> = {
  Shield,
  Compass,
  Users,
  Heart,
  Leaf,
  Globe
};

export interface SustainabilityPatternProps {
  projects: ConservationProject[];
  commitments: SustainabilityCommitment[];
  className?: string;
}

/**
 * SustainabilityPattern - Section highlighting conservation and community work.
 */
export function SustainabilityPattern({
  projects,
  commitments,
  className,
}: SustainabilityPatternProps) {
  return (
    <section className={cn("wp-pattern-sustainability py-section-lg bg-background", className)}>
      <Container>
        {/* Commitments Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-2xl pb-fluid-3xl">
          {commitments.map((commitment, idx) => {
            const Icon = ICON_MAP[commitment.iconName] || Leaf;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-element-2xl rounded-[var(--radius-3xl)] bg-[color:var(--color-muted)]/30 border border-[color:var(--color-border)]/50 group hover:bg-[color:var(--color-muted)]/50 transition-colors"
              >
                <div className="w-[var(--spacing-element-4xl)] h-[var(--spacing-element-4xl)] rounded-[var(--radius-2xl)] bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] flex items-center justify-center pb-element-lg group-hover:scale-110 transition-transform">
                  <Icon className="w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]" />
                </div>
                <h3 className="text-[length:var(--text-xl)] pb-element-sm font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)] !m-0">{commitment.title}</h3>
                <p className="text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] leading-relaxed m-0">{commitment.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Conservation Projects Header */}
        <div className="max-w-3xl pb-fluid-2xl flex flex-col gap-element-lg">
          <HeadingBlock level={2} className="text-[length:var(--text-4xl)] md:text-[length:var(--text-5xl)] !m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)]">
            Pioneering Conservation Initiatives
          </HeadingBlock>
          <ParagraphBlock className="text-[length:var(--text-lg)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] leading-relaxed !m-0">
            We partner with leading NGOs and local conservancies to protect Africa's 
            extraordinary biodiversity while ensuring local communities thrive through sustainable tourism.
          </ParagraphBlock>
        </div>

        {/* Conservation Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-2xl">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col bg-[color:var(--color-card)] rounded-[var(--radius-3xl)] overflow-hidden border-2 border-[color:var(--color-border)]/50 hover:border-[color:var(--color-primary)] transition-all duration-500 hover:shadow-[var(--elevation-2xl)]"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-element-2xl flex-1 flex flex-col">
                <div className="flex items-center gap-fluid-sm pb-element-md">
                  <span className="px-element-md py-element-xs rounded-[var(--radius-full)] bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] font-[family:var(--font-family-noto-sans)] text-[length:var(--text-xs)] font-[weight:var(--font-weight-bold)] uppercase tracking-widest">
                    {project.category}
                  </span>
                  <div className="h-px flex-1 bg-[color:var(--color-border)]/50" />
                </div>
                
                <h3 className="text-[length:var(--text-2xl)] pb-element-md !m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)] group-hover:text-[color:var(--color-primary)] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-[length:var(--text-base)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] leading-relaxed pb-fluid-lg flex-1 m-0">
                  {project.description}
                </p>
                
                <div className="p-element-xl rounded-[var(--radius-2xl)] bg-[color:var(--color-muted)]/50 border border-[color:var(--color-border)]/50 flex flex-col gap-element-sm">
                  <p className="text-[length:var(--text-xs)] font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-bold)] uppercase tracking-widest text-[color:var(--color-primary)] m-0">Measured Impact</p>
                  <p className="text-[length:var(--text-sm)] font-[family:var(--font-family-noto-sans)] text-[color:var(--color-foreground)] m-0">{project.impact}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default SustainabilityPattern;