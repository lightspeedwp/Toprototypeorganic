import { EditorialContent } from "../components/patterns/EditorialContent";
import { CTA } from "../components/patterns/CTA";
import { WhyChooseUsPattern } from "../components/patterns/WhyChooseUsPattern";
import { StatisticsMetricsPattern } from "../components/patterns/StatisticsMetricsPattern";
import { TeamCard } from "../components/patterns/TeamCard";
import { CardGrid } from "../components/patterns/CardGrid";
import { Container } from "../components/common/Container";
import { PageShell } from "../components/parts/PageShell";
import { TEAM, getPageSectionFAQs } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";
import { FAQ } from "../components/patterns/FAQ";
import { HeadingBlock } from "../components/blocks/core/HeadingBlock";
import { ParagraphBlock } from "../components/blocks/core/ParagraphBlock";
import { Calendar, Users, Star, Medal as Award, Leaf, Heart } from "@phosphor-icons/react";

export function AboutPage() {
  const { navigateToTeamMember, navigateTo } = useNavigation();

  const faqData = getPageSectionFAQs("about");

  return (
    <PageShell context="about" className="theme-organic">
      <section className="organic-section-top texture-medium">
        {/* Our Mission Statement */}
        <div className="wp-template-page__content border-b border-[color:var(--color-border)] py-section-md">
          <Container maxWidth="narrow">
            <div className="flex flex-col items-center text-center gap-element-md">
              <span className="wp-badge wp-badge--primary">Our Mission</span>
              <h2 className="italic font-[family:var(--font-family-caveat)] text-[length:var(--text-4xl)] text-accent m-0">
                "To inspire a profound connection with nature through responsible, transformative travel."
              </h2>
              <ParagraphBlock className="text-muted-foreground text-[length:var(--text-lg)] leading-relaxed m-0">
                We believe that travel is more than just seeing new places—it's about perspective. 
                By bridging the gap between luxury and conservation, we provide experiences that 
                honor the land and empower its people.
              </ParagraphBlock>
            </div>
          </Container>
        </div>
      </section>

      <section className="organic-section-middle texture-subtle">
        <div className="flex flex-col gap-section-md">
          {/* Narrative Section */}
          <div className="bg-muted bg-opacity-10 py-section-sm">
            <EditorialContent
              title="The Journey So Far"
              subtitle="From a single Land Rover to a pan-African network."
              content={`
                <p>Founded by safari enthusiasts and expert guides, our company was born from a desire to do things differently. We saw a gap in the market for tours that didn't just 'observe' wildlife, but actively participated in its protection.</p>
                
                <p>Today, we operate in 12 countries, partnering with over 150 conservation-minded lodges. Our approach remains unchanged: small groups, expert-led narratives, and a relentless focus on the 'hidden' Africa that mass tourism often misses.</p>
                
                <h3>Why Our Method Works</h3>
                <p>We don't just book rooms; we design experiences. Every itinerary is tested personally by our team. If we wouldn't take our own families there, we won't take you. This quality control is what defines us as specialists.</p>
              `}
              animated
            />
          </div>

          {/* Impact Stats */}
          <div className="wp-template-page__stats border-y border-[color:var(--color-border)]">
            <StatisticsMetricsPattern
              title="By The Numbers"
              description="Our impact reaches far beyond the game drive."
              statistics={[
                { value: "15+", label: "Years of Service", icon: Calendar },
                { value: "5k+", label: "Wilderness Advocates", icon: Users },
                { value: "120k", label: "Acres Protected", icon: Leaf },
                { value: "98%", label: "Guest Satisfaction", icon: Star },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="organic-section-middle texture-subtle">
        {/* Core Values */}
        <WhyChooseUsPattern
          title="The Pillars of Our Pride"
          description="The values that guide every decision we make."
          features={[
            {
              title: "Expertise First",
              description: "Our guides average 10+ years in the field, with deep knowledge of botany, tracks, and local lore.",
              icon: Award,
            },
            {
              title: "Zero Trace",
              description: "We are committed to carbon-neutral operations and plastic-free safaris across our entire network.",
              icon: Leaf,
            },
            {
              title: "Local Impact",
              description: "80% of our revenue stays within the host communities, supporting schools and medical clinics.",
              icon: Heart,
            },
            {
              title: "Tailored Craft",
              description: "No two travelers are alike. Every journey is adjusted to your pace, interests, and curiosity.",
              icon: Users,
            },
          ]}
        />
      </section>

      <section className="organic-section-bottom texture-subtle">
        <div className="flex flex-col gap-section-lg">
          {/* Team Section */}
          <div className="wp-template-page__content border-t border-[color:var(--color-border)] pt-section-md">
            <Container>
              <div className="flex flex-col gap-element-xl">
                <div className="flex flex-col md:flex-row justify-between items-end gap-fluid-lg">
                  <div className="flex flex-col gap-element-sm max-w-2xl">
                    <span className="wp-badge wp-badge--primary">Our Experts</span>
                    <HeadingBlock level={2} className="m-0 text-[length:var(--text-4xl)] font-[family:var(--font-family-lora)]">
                      The People Behind the Adventure
                    </HeadingBlock>
                    <ParagraphBlock className="text-muted-foreground m-0 text-[length:var(--text-base)] font-[family:var(--font-family-noto-sans)]">
                      Meet the safari designers, logistics experts, and field guides who make it all possible.
                    </ParagraphBlock>
                  </div>
                  <button 
                    onClick={() => navigateTo("/team")}
                    className="text-[length:var(--text-sm)] font-[family:var(--font-family-noto-sans)] text-primary hover:underline underline-offset-4 bg-transparent border-none p-0 cursor-pointer"
                  >
                    View Full Team
                  </button>
                </div>
                
                <CardGrid columns={3}>
                  {TEAM.slice(0, 3).map((member) => (
                    <TeamCard
                      key={member.id}
                      member={member}
                      onClick={() => navigateToTeamMember(member.slug)}
                    />
                  ))}
                </CardGrid>
              </div>
            </Container>
          </div>

          {/* FAQ */}
          {faqData && faqData.items.length > 0 && (
            <FAQ
              items={faqData.items}
              title="Questions About Us"
              intro="Learn more about our booking process, safety standards, and values."
            />
          )}

          {/* Final CTA */}
          <CTA
            title="Ready to Write Your Chapter?"
            description="Join us for a journey that changes how you see the world."
            variant="default"
            primaryAction={{ 
              label: "Plan Your Safari", 
              onClick: () => navigateTo("/trip-planner")
            }}
            secondaryAction={{ 
              label: "View All Tours", 
              onClick: () => navigateTo("/tours")
            }}
          />
        </div>
      </section>
    </PageShell>
  );
}

export default AboutPage;