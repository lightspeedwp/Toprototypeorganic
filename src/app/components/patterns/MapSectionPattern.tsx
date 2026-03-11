/**
 * Map Section Pattern Component
 * 
 * Displays a map (interactive or static) with location details.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { MapPin, ArrowSquareOut as ExternalLink, NavigationArrow as Navigation, Compass } from "@phosphor-icons/react";
import { Button } from "../blocks/design/Button";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

export interface MapLocation {
  name: string;
  lat?: number;
  lng?: number;
  address?: string;
  description?: string;
}

export interface MapSectionPatternProps {
  title?: string;
  description?: string;
  location?: MapLocation;
  destinations?: MapLocation[];
  mapType?: 'interactive' | 'static';
  mapImageUrl?: string;
  embedUrl?: string;
  variant?: 'default' | 'split';
  className?: string;
}

export function MapSectionPattern({
  title = "Territory Cartography",
  description,
  location,
  destinations = [],
  mapType = 'static',
  mapImageUrl,
  embedUrl,
  variant = 'default',
  className,
}: MapSectionPatternProps) {
  const isSplit = variant === 'split';
  const displayDestinations = location ? [location] : destinations;

  const getDirectionsUrl = (loc: MapLocation) => {
    if (loc.lat && loc.lng) return `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address || loc.name)}`;
  };

  return (
    <section className={cn("wp-pattern-lts-map has-section-padding-md bg-muted/5 border-y-2 border-border/50", className)}>
      <Container>
        <div className={cn(
          "grid gap-[var(--spacing-gap-lg)] lg:gap-[var(--spacing-gap-2xl)]",
          isSplit ? "lg:grid-cols-12 items-start" : "grid-cols-1"
        )}>
          {/* Info Side */}
          <div className={cn(isSplit ? "lg:col-span-5" : "text-center max-w-3xl mx-auto mb-[var(--spacing-gap-2xl)]")}>
            <div className={cn("flex items-center gap-[var(--spacing-gap-sm)] mb-[var(--spacing-element-lg)]", !isSplit && "justify-center")}>
              <div className="w-[var(--spacing-element-4xl)] h-[var(--spacing-element-4xl)] rounded-[var(--radius-2xl)] bg-primary/10 flex items-center justify-center text-primary shadow-[var(--elevation-sm)] shrink-0">
                <Compass className="w-[var(--spacing-element-2xl)] h-[var(--spacing-element-2xl)]" />
              </div>
              <div>
                <HeadingBlock level={2} className="text-[length:var(--text-3xl)] md:text-[length:var(--text-4xl)] mb-0">
                  {title}
                </HeadingBlock>
              </div>
            </div>
            
            {description && (
              <ParagraphBlock className="text-muted-foreground text-[length:var(--text-lg)] mb-[var(--spacing-gap-xl)] leading-relaxed">
                {description}
              </ParagraphBlock>
            )}

            <div className="space-y-[var(--spacing-gap-md)]">
              {displayDestinations.map((loc, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-[var(--spacing-element-xl)] rounded-[var(--radius-3xl)] bg-card border-2 border-border shadow-[var(--elevation-sm)] hover:border-primary transition-all duration-500 group"
                >
                  <div className="flex items-start justify-between gap-[var(--spacing-gap-sm)] mb-[var(--spacing-element-md)]">
                    <div>
                      <h4 className="text-[length:var(--text-xl)] mb-[var(--spacing-element-xs)] group-hover:text-primary transition-colors">{loc.name}</h4>
                      <p className="text-[length:var(--text-xs)] uppercase tracking-widest text-muted-foreground m-0">Position: {loc.lat ? `${loc.lat}, ${loc.lng}` : 'Regional Area'}</p>
                    </div>
                    <div className="p-[var(--spacing-element-sm)] rounded-[var(--radius-xl)] bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      <MapPin className="w-[var(--spacing-element-lg)] h-[var(--spacing-element-lg)]" />
                    </div>
                  </div>
                  {loc.description && (
                    <p className="text-[length:var(--text-sm)] text-muted-foreground leading-relaxed mb-[var(--spacing-element-lg)] m-0">{loc.description}</p>
                  )}
                  <button 
                    onClick={() => window.open(getDirectionsUrl(loc), '_blank')}
                    className="flex items-center gap-[var(--spacing-gap-xs)] text-[length:var(--text-xs)] uppercase tracking-widest text-primary hover:underline underline-offset-8 transition-all font-[var(--font-weight-bold)]"
                  >
                    <Navigation className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" /> Navigation Protocols →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map Side */}
          <div className={cn(
            "lg:col-span-7 sticky top-[var(--spacing-element-4xl)]",
            !isSplit && "lg:col-span-full"
          )}>
            <div className="rounded-[var(--radius-3xl)] md:rounded-[var(--radius-full)] overflow-hidden border-2 border-border shadow-[var(--elevation-2xl)] bg-muted relative group aspect-video lg:aspect-square">
              {mapType === 'interactive' && embedUrl ? (
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  className="border-0 grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  allowFullScreen
                  loading="lazy"
                  title={`Expedition Map`}
                />
              ) : (
                <div className="w-full h-full">
                  <img
                    src={mapImageUrl || "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200"}
                    alt="Regional Cartography"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                </div>
              )}
              
              {/* Floating Map Controls UI (Visual Only) */}
              <div className="absolute top-[var(--spacing-element-xl)] right-[var(--spacing-element-xl)] flex flex-col gap-[var(--spacing-gap-sm)]">
                <div className="p-[var(--spacing-element-sm)] rounded-[var(--radius-2xl)] bg-background/90 backdrop-blur shadow-[var(--elevation-xl)] border border-border/50 flex flex-col gap-[var(--spacing-gap-sm)]">
                  <div className="w-[var(--spacing-element-xl)] h-[var(--spacing-element-xl)] rounded-[var(--radius-lg)] bg-muted flex items-center justify-center text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
                    <Plus className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" />
                  </div>
                  <div className="w-full h-px bg-border/50" />
                  <div className="w-[var(--spacing-element-xl)] h-[var(--spacing-element-xl)] rounded-[var(--radius-lg)] bg-muted flex items-center justify-center text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
                    <Minus className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" />
                  </div>
                </div>
                <div className="p-[var(--spacing-element-sm)] rounded-[var(--radius-2xl)] bg-background/90 backdrop-blur shadow-[var(--elevation-xl)] border border-border/50 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
                  <ExternalLink className="w-[var(--spacing-element-lg)] h-[var(--spacing-element-lg)]" />
                </div>
              </div>

              {/* Legend Overlay */}
              <div className="absolute bottom-[var(--spacing-element-xl)] left-[var(--spacing-element-xl)] p-[var(--spacing-element-lg)] rounded-[var(--radius-2xl)] bg-background/90 backdrop-blur shadow-[var(--elevation-xl)] border border-border/50 max-w-[200px] hidden md:block">
                <p className="text-[length:var(--text-xs)] uppercase tracking-widest text-muted-foreground mb-[var(--spacing-element-sm)] font-[var(--font-weight-bold)] m-0">Map Legend</p>
                <div className="space-y-[var(--spacing-gap-xs)]">
                  <div className="flex items-center gap-[var(--spacing-gap-sm)]">
                    <div className="w-[var(--spacing-element-xs)] h-[var(--spacing-element-xs)] rounded-[var(--radius-full)] bg-primary" />
                    <span className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)]">Primary Site</span>
                  </div>
                  <div className="flex items-center gap-[var(--spacing-gap-sm)]">
                    <div className="w-[var(--spacing-element-xs)] h-[var(--spacing-element-xs)] rounded-[var(--radius-full)] bg-accent" />
                    <span className="text-[length:var(--text-xs)] font-[var(--font-weight-bold)]">Base Camp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Icons for map controls
const Plus = ({ className }: { className?: string }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
const Minus = ({ className }: { className?: string }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12" /></svg>;

export default MapSectionPattern;