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
import { Shield, Compass, Users, Heart, Leaf, Globe, Icon as PhosphorIcon } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import type { ConservationProject, SustainabilityCommitment } from "../../data/sustainability";

const ICON_MAP: Record<string, PhosphorIcon> = {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {commitments.map((commitment, idx) => {
            const Icon = ICON_MAP[commitment.iconName] || Leaf;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-muted/30 border border-border/50 group hover:bg-muted/50 transition-colors"
              >
                <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="size-8" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{commitment.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed m-0">{commitment.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Conservation Projects Header */}
        <div className="max-w-3xl mb-16">
          <HeadingBlock level={2} className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Pioneering Conservation Initiatives
          </HeadingBlock>
          <ParagraphBlock className="text-lg text-muted-foreground leading-relaxed">
            We partner with leading NGOs and local conservancies to protect Africa's 
            extraordinary biodiversity while ensuring local communities thrive through sustainable tourism.
          </ParagraphBlock>
        </div>

        {/* Conservation Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col bg-card rounded-[2.5rem] overflow-hidden border-2 border-border/50 hover:border-primary transition-all duration-500 hover:shadow-2xl"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest">
                    {project.category}
                  </span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                
                <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>
                
                <div className="mt-auto p-6 rounded-2xl bg-muted/50 border border-border/50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Measured Impact</p>
                  <p className="text-sm font-bold m-0">{project.impact}</p>
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
