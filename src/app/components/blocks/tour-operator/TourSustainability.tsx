/**
 * Tour Sustainability Block Component
 * 
 * Displays conservation projects and sustainability commitments for a tour.
 * This block highlights the tour's impact on the environment and local communities.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/sustainability
 * - Category: Tour Operator
 * - Used on single tour pages or sustainability archive
 * 
 * @module TourSustainability
 * @category blocks/tour-operator
 */

import './TourSustainability.css';
import { Shield, Compass, Users, Heart, Leaf, Globe } from '@phosphor-icons/react';
import { motion as Motion } from 'motion/react';
import { cn } from '../../../lib/utils';
import type { ComponentType } from 'react';

const ICON_MAP: Record<string, ComponentType<any>> = {
  Shield,
  Compass,
  Users,
  Heart,
  Leaf,
  Globe
};

export interface ConservationProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "Wildlife" | "Community" | "Environment";
  impact: string;
  iconName: string;
}

export interface SustainabilityCommitment {
  title: string;
  description: string;
  iconName: string;
}

export interface TourSustainabilityProps {
  /** Optional title for the section */
  title?: string;
  /** Array of conservation projects */
  projects?: ConservationProject[];
  /** Array of sustainability commitments */
  commitments?: SustainabilityCommitment[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Tour Sustainability Block component.
 * 
 * @component
 * @category blocks/tour-operator
 */
export function TourSustainability({
  title = 'Our Commitment to Conservation',
  projects = [],
  commitments = [],
  className = '',
}: TourSustainabilityProps) {
  if (projects.length === 0 && commitments.length === 0) {
    return null;
  }

  return (
    <section className={cn('lsx-tour-sustainability', className)} aria-label={title}>
      <div className="lsx-tour-sustainability__header">
        <h2>{title}</h2>
      </div>

      {/* Commitments Section */}
      {commitments.length > 0 && (
        <div className="lsx-tour-sustainability__commitments">
          {commitments.map((commitment, idx) => {
            const Icon = ICON_MAP[commitment.iconName] || Leaf;
            return (
              <div key={idx} className="lsx-tour-sustainability__commitment-item">
                <div className="lsx-tour-sustainability__commitment-icon">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <div className="lsx-tour-sustainability__commitment-content">
                  <h3>{commitment.title}</h3>
                  <p>{commitment.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="lsx-tour-sustainability__projects">
          {projects.map((project, idx) => (
            <Motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="lsx-tour-sustainability__project-card"
            >
              <div className="lsx-tour-sustainability__project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="lsx-tour-sustainability__project-image"
                  loading="lazy"
                />
                <div className="lsx-tour-sustainability__project-badge">
                  {project.category}
                </div>
              </div>
              <div className="lsx-tour-sustainability__project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="lsx-tour-sustainability__project-impact">
                  <strong>Impact:</strong> {project.impact}
                </div>
              </div>
            </Motion.article>
          ))}
        </div>
      )}
    </section>
  );
}

TourSustainability.displayName = 'TourSustainability';