/**
 * Careers Page
 *
 * Job listings, company values, and employee benefits.
 * Filterable by department with detailed job cards.
 *
 * WordPress Mapping: templates/page-careers.html
 * CSS: /src/styles/pages/careers.css
 * BEM: .wp-page-careers__*
 *
 * @module CareersPage
 * @category pages
 */

import { useState, useMemo } from "react";
import { PageShell } from "../components/parts/PageShell";
import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import {
  Leaf,
  Users,
  Compass,
  BookOpen,
  Plane,
  Home,
  GraduationCap,
  Heart,
  Shield,
  Mountain,
  MapPin,
  Briefcase,
  Clock,
  Check,
  Search,
} from "lucide-react";
import {
  JOB_LISTINGS,
  DEPARTMENTS,
  COMPANY_VALUES,
  EMPLOYEE_BENEFITS,
} from "../data/careers";

/** Map icon name strings to Lucide components */
const ICON_MAP: Record<string, React.ElementType> = {
  Leaf,
  Users,
  Compass,
  BookOpen,
  Plane,
  Home,
  GraduationCap,
  Heart,
  Shield,
  Mountain,
};

export function CareersPage() {
  const [activeDept, setActiveDept] = useState("all");

  const filteredJobs = useMemo(() => {
    if (activeDept === "all") return JOB_LISTINGS;
    return JOB_LISTINGS.filter((j) => j.department === activeDept);
  }, [activeDept]);

  return (
    <PageShell context="careers" className="theme-organic">
      {/* Company Values */}
      <section className="wp-page-careers__values">
        <Container>
          <div className="wp-page-careers__section-header">
            <h2 className="wp-page-careers__section-title">What Drives Us</h2>
            <p className="wp-page-careers__section-subtitle">
              Our values shape every journey we create and every team we build
            </p>
          </div>

          <div className="wp-page-careers__values-grid">
            {COMPANY_VALUES.map((value) => {
              const IconComp = ICON_MAP[value.icon] ?? Compass;
              return (
                <div key={value.id} className="wp-page-careers__value-card">
                  <IconComp className="wp-page-careers__value-icon" aria-hidden="true" />
                  <h3 className="wp-page-careers__value-title">{value.title}</h3>
                  <p className="wp-page-careers__value-desc">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Employee Benefits */}
      <section className="wp-page-careers__benefits">
        <Container>
          <div className="wp-page-careers__section-header">
            <h2 className="wp-page-careers__section-title">Why Join Our Team</h2>
            <p className="wp-page-careers__section-subtitle">
              We invest in our people as much as we invest in conservation
            </p>
          </div>

          <div className="wp-page-careers__benefits-grid">
            {EMPLOYEE_BENEFITS.map((benefit) => {
              const IconComp = ICON_MAP[benefit.icon] ?? Heart;
              return (
                <div key={benefit.id} className="wp-page-careers__benefit-card">
                  <IconComp className="wp-page-careers__benefit-icon" aria-hidden="true" />
                  <div className="wp-page-careers__benefit-content">
                    <h3 className="wp-page-careers__benefit-title">{benefit.title}</h3>
                    <p className="wp-page-careers__benefit-desc">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Job Listings */}
      <section className="wp-page-careers__jobs">
        <Container>
          <div className="wp-page-careers__section-header">
            <h2 className="wp-page-careers__section-title">Open Positions</h2>
            <p className="wp-page-careers__section-subtitle">
              Find your place in our global team of travel and conservation professionals
            </p>
          </div>

          {/* Department Filters */}
          <nav aria-label="Department filter" className="wp-page-careers__filters">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                className={`wp-page-careers__filter-chip${activeDept === dept.id ? " wp-page-careers__filter-chip--active" : ""}`}
                onClick={() => setActiveDept(dept.id)}
                aria-pressed={activeDept === dept.id}
              >
                {dept.label}
              </button>
            ))}
          </nav>

          {/* Job Cards */}
          <div className="wp-page-careers__jobs-list" role="list" aria-label="Job listings">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className={`wp-page-careers__job-card${job.featured ? " wp-page-careers__job-card--featured" : ""}`}
                role="listitem"
              >
                <div className="wp-page-careers__job-header">
                  <h3 className="wp-page-careers__job-title">{job.title}</h3>
                  <div className="wp-page-careers__job-badges">
                    {job.featured && (
                      <span className="wp-page-careers__job-badge wp-page-careers__job-badge--featured">
                        Featured
                      </span>
                    )}
                    <span className="wp-page-careers__job-badge">{job.type}</span>
                    <span className="wp-page-careers__job-badge">{job.level}</span>
                  </div>
                </div>

                <div className="wp-page-careers__job-meta">
                  <span className="wp-page-careers__job-meta-item">
                    <MapPin className="wp-page-careers__job-meta-icon" aria-hidden="true" />
                    {job.location}
                  </span>
                  <span className="wp-page-careers__job-meta-item">
                    <Briefcase className="wp-page-careers__job-meta-icon" aria-hidden="true" />
                    {DEPARTMENTS.find((d) => d.id === job.department)?.label ?? job.department}
                  </span>
                  <span className="wp-page-careers__job-meta-item">
                    <Clock className="wp-page-careers__job-meta-icon" aria-hidden="true" />
                    Posted {new Date(job.posted).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>

                <p className="wp-page-careers__job-desc">{job.description}</p>

                <ul className="wp-page-careers__job-requirements" aria-label="Requirements">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="wp-page-careers__job-requirement">
                      <Check className="wp-page-careers__job-requirement-icon" aria-hidden="true" />
                      {req}
                    </li>
                  ))}
                </ul>

                <button
                  className="wp-page-careers__job-apply"
                  aria-label={`Apply for ${job.title}`}
                >
                  Apply Now
                </button>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="wp-page-careers__empty" role="status">
              <Search className="wp-page-careers__empty-icon" aria-hidden="true" />
              <p className="wp-page-careers__empty-title">No openings in this department</p>
              <p className="wp-page-careers__empty-desc">
                Check back soon or try a different department filter. You can also send us a speculative application.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <CTA
        title="Don't see the right role?"
        description="We're always looking for passionate people. Send us your CV and tell us how you'd contribute to our mission."
        primaryLabel="Send speculative application"
        primaryHref="/contact"
        variant="primary"
      />
    </PageShell>
  );
}

export default CareersPage;
