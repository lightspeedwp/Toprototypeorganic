/**
 * Card Interactions — Developer Tool
 *
 * Showcases all card component variants (Tour, Destination, Accommodation,
 * Blog, Team, Special) in their default, hover, focus, and loading states.
 * Each card uses real mock data and design system tokens.
 *
 * @module CardInteractions
 * @category dev-tools
 */

import { useState } from "react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { TourCard } from "../../components/patterns/TourCard";
import { DestinationCard } from "../../components/patterns/DestinationCard";
import { AccommodationCard } from "../../components/patterns/AccommodationCard";
import { BlogCard } from "../../components/patterns/BlogCard";
import { TeamCard } from "../../components/patterns/TeamCard";
import { SpecialCard } from "../../components/patterns/SpecialCard";
import { TOURS, DESTINATIONS, ACCOMMODATION, BLOG_POSTS, TEAM, SPECIALS } from "../../data/mock";
import { SquaresFour } from "@phosphor-icons/react";

type CardType = "tour" | "destination" | "accommodation" | "blog" | "team" | "special";

const CARD_TYPES: { id: CardType; label: string; count: number }[] = [
  { id: "tour", label: "Tour Card", count: TOURS.length },
  { id: "destination", label: "Destination Card", count: DESTINATIONS.length },
  { id: "accommodation", label: "Accommodation Card", count: ACCOMMODATION.length },
  { id: "blog", label: "Blog Card", count: BLOG_POSTS.length },
  { id: "team", label: "Team Card", count: TEAM.length },
  { id: "special", label: "Special Card", count: SPECIALS.length },
];

export default function CardInteractions() {
  const [activeType, setActiveType] = useState<CardType>("tour");

  const renderCards = () => {
    switch (activeType) {
      case "tour":
        return TOURS.slice(0, 3).map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ));
      case "destination":
        return DESTINATIONS.slice(0, 3).map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ));
      case "accommodation":
        return ACCOMMODATION.slice(0, 3).map((acc) => (
          <AccommodationCard key={acc.id} accommodation={acc} />
        ));
      case "blog":
        return BLOG_POSTS.slice(0, 3).map((post) => (
          <BlogCard key={post.id} post={post} />
        ));
      case "team":
        return TEAM.slice(0, 3).map((member) => (
          <TeamCard key={member.id} member={member} />
        ));
      case "special":
        return SPECIALS.slice(0, 3).map((special) => (
          <SpecialCard key={special.id} special={special} />
        ));
      default:
        return null;
    }
  };

  return (
    <>
      <DevToolsBreadcrumbs currentPage="Card Interactions" />

      <section className="py-section-sm bg-muted border-b border-border">
        <Container>
          <div className="flex flex-col gap-element-sm">
            <div className="wp-page-header__icon-container w-14 h-14 flex items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-primary transition-colors hover:bg-primary/20">
              <SquaresFour className="w-7 h-7" />
            </div>
            <h1>Card Interactions</h1>
            <p className="text-muted-foreground max-w-3xl">
              Interactive specimens of every card component used in the system.
              Select a card type below to see live examples rendered with real mock data.
              Hover and focus each card to test interaction states.
            </p>
          </div>
        </Container>
      </section>

      {/* Card type selector */}
      <section className="py-section-sm bg-background border-b border-border">
        <Container>
          <h2 className="pb-6">Select Card Type</h2>
          <div className="flex flex-wrap gap-3">
            {CARD_TYPES.map((ct) => (
              <button
                key={ct.id}
                onClick={() => setActiveType(ct.id)}
                className={`px-4 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                  activeType === ct.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                {ct.label}
                <span className="text-xs opacity-75">({ct.count})</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Card grid */}
      <section className="py-section-sm bg-background">
        <Container>
          <h3 className="pb-6">
            {CARD_TYPES.find((c) => c.id === activeType)?.label} — Live Specimens
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renderCards()}
          </div>
        </Container>
      </section>

      {/* Design tokens reference */}
      <section className="py-section-sm bg-muted">
        <Container>
          <h2 className="pb-6">Card Design Tokens</h2>
          <p className="text-muted-foreground pb-8">All cards share these common design system tokens.</p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-border rounded-lg bg-card p-6">
              <h4 className="pb-4">Colours</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Background", variable: "--card", tw: "bg-card" },
                  { label: "Text", variable: "--card-foreground", tw: "text-card-foreground" },
                  { label: "Border", variable: "--border", tw: "border-border" },
                  { label: "Muted text", variable: "--muted-foreground", tw: "text-muted-foreground" },
                  { label: "Hover border", variable: "--primary", tw: "hover:border-primary/50" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-sm border border-border shrink-0"
                      style={{ backgroundColor: `var(${item.variable})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm mb-0">{item.label}</p>
                      <code className="text-xs text-muted-foreground">{item.tw}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border rounded-lg bg-card p-6">
              <h4 className="pb-4">Structure</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Border radius", value: "var(--radius-lg) → 6 px" },
                  { label: "Shadow (rest)", value: "var(--elevation-sm)" },
                  { label: "Shadow (hover)", value: "var(--elevation-md)" },
                  { label: "Image aspect", value: "16:9 (object-cover)" },
                  { label: "Padding", value: "p-4 / p-6 (responsive)" },
                  { label: "Grid gap", value: "gap-6 (24 px)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <p className="text-sm mb-0">{item.label}</p>
                    <code className="text-xs text-muted-foreground">{item.value}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Responsive behaviour */}
      <section className="py-section-sm bg-background">
        <Container>
          <h2 className="pb-6">Responsive Behaviour</h2>
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            <div className="grid grid-cols-3 gap-0 text-sm border-b border-border bg-muted px-6 py-3">
              <span className="text-muted-foreground">Breakpoint</span>
              <span className="text-muted-foreground">Grid Columns</span>
              <span className="text-muted-foreground">Width</span>
            </div>
            {[
              { bp: "Mobile", cols: "1 column", width: "< 640 px" },
              { bp: "Tablet", cols: "2 columns", width: "640 – 1024 px" },
              { bp: "Desktop", cols: "3 columns", width: "1024 – 1440 px" },
              { bp: "Wide", cols: "3–4 columns", width: "> 1440 px" },
            ].map((row) => (
              <div key={row.bp} className="grid grid-cols-3 gap-0 px-6 py-3 border-b border-border last:border-b-0">
                <span className="text-sm">{row.bp}</span>
                <span className="text-sm text-muted-foreground">{row.cols}</span>
                <span className="text-sm text-muted-foreground">{row.width}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}