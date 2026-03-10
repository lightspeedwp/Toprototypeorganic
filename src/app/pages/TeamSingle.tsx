/**
 * Team Member Single Page - WordPress Template
 * 
 * Single team member profile page with bio, specialties, contact info, and related tours.
 * Maps to WordPress single-team.php template.
 */

import { useParams } from "react-router";
import { Hero } from "../components/patterns/Hero";
import { FastFacts } from "../components/patterns/FastFacts";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { EditorialContent } from "../components/patterns/EditorialContent";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { StatisticsMetricsPattern } from "../components/patterns/StatisticsMetricsPattern";
import { RelatedContent } from "../components/patterns/RelatedContent";
import { TourCard } from "../components/patterns/TourCard";
import { Container } from "../components/common/Container";
import { TOURS, FAQ_GENERAL } from "../data/mock";
import { ALL_TEAM } from "../data/mockExpanded";
import { getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { EnvelopeSimple as Mail, Phone, Medal as Award, Globe, Calendar, Users, Star } from "@phosphor-icons/react";

/**
 * Team Member Single Page Component
 */
export function TeamSingle() {
  const { slug } = useParams<{ slug: string }>();
  const { navigateToTour, navigateTo } = useNavigation();

  // Find team member by slug, check enhanced data first
  const teamMember = ALL_TEAM.find(m => m.slug === slug) || ALL_TEAM[0];

  // Get tours related to this team member's specialties
  const relatedTours = TOURS.slice(0, 3);

  // Fast facts for team member
  const fastFacts = [
    { icon: Mail, label: "Email Address", value: teamMember.email },
    { icon: Phone, label: "Direct Line", value: teamMember.phone },
    { icon: Award, label: "Expertise", value: teamMember.specialties.join(", ") },
  ];

  // Statistics/metrics
  const statistics = [
    {
      value: "15+",
      label: "Years Experience",
      icon: Calendar,
    },
    {
      value: "500+",
      label: "Happy Clients",
      icon: Users,
    },
    {
      value: "50+",
      label: "Countries Visited",
      icon: Globe,
    },
    {
      value: "4.9",
      label: "Average Rating",
      icon: Star,
      suffix: "/5"
    },
  ];

  return (
    <article className="wp-template-single">
      {/* Breadcrumbs */}
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: "Our Team", href: "/team", onClick: () => navigateTo("/team") },
          { label: teamMember.name, isCurrent: true },
        ]}
        fullWidth={true}
      />

      {/* Hero */}
      <Hero
        title={teamMember.name}
        intro={teamMember.excerpt}
        image={teamMember.featuredImage}
        context={teamMember.role}
        primaryCTA={{ 
          label: "Contact Me",
          onClick: () => navigateTo("/contact")
        }}
        secondaryCTA={{
          label: "View All Team",
          onClick: () => navigateTo("/team"),
          variant: "outline"
        }}
      />

      {/* Fast Facts */}
      <FastFacts facts={fastFacts} />

      {/* Biography */}
      <EditorialContent
        title={`Meet ${teamMember.name.split(' ')[0]}`}
        subtitle={teamMember.role}
        content={teamMember.bio}
        animated
      />

      {/* Statistics */}
      <StatisticsMetricsPattern
        title="Impact & Expertise"
        description="Numbers that reflect a career dedicated to exceptional travel"
        statistics={statistics}
      />

      {/* Specialty Highlights */}
      <EditorialContent
        title="Areas of Specialization"
        subtitle="Crafting unique experiences"
        variant="narrow"
        content={`
          <p>I specialize in creating unforgettable travel experiences in the following areas:</p>
          <ul>
            ${teamMember.specialties.map(specialty => `<li>${specialty}</li>`).join('')}
          </ul>
          <p>My extensive personal travel experience and industry knowledge allow me to craft personalized itineraries that exceed expectations. I'm passionate about sharing the world's wonders with fellow travelers and helping them create memories that last a lifetime.</p>
        `}
      />

      {/* Related Tours */}
      <RelatedContent title="Tours I've Designed">
        {relatedTours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            onClick={() => navigateToTour(tour.slug)}
          />
        ))}
      </RelatedContent>

      {/* FAQ */}
      <FAQ
        title="Travel Consultant FAQ"
        intro="Common questions about working with our specialists"
        items={getPageSectionFAQs("team-single")?.items || FAQ_GENERAL.slice(0, 4)}
      />

      {/* Final CTA */}
      <CTA
        title={`Ready to Plan Your Dream Trip with ${teamMember.name.split(' ')[0]}?`}
        description={`Let me help you create an unforgettable travel experience tailored to your interests.`}
        variant="gradient"
        primaryAction={{
          label: "Request a Consultation",
          onClick: () => navigateTo("/contact"),
        }}
        secondaryAction={{
          label: "View All Tours",
          onClick: () => navigateTo("/tours"),
        }}
      />
    </article>
  );
}

export default TeamSingle;
