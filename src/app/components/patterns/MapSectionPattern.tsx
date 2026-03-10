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
          "grid gap-12 lg:gap-20",
          isSplit ? "lg:grid-cols-12 items-start" : "grid-cols-1"
        )}>
          {/* Info Side */}
          <div className={cn(isSplit ? "lg:col-span-5" : "text-center max-w-3xl mx-auto mb-16")}>
            <div className={cn("flex items-center gap-4 mb-8", !isSplit && "justify-center")}>
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shrink-0">
                <Compass className="size-7" />
              </div>
              <div>
                <HeadingBlock level={2} className="text-3xl md:text-4xl font-bold font-serif mb-0">
                  {title}
                </HeadingBlock>
              </div>
            </div>
            
            {description && (
              <ParagraphBlock className="text-muted-foreground text-lg mb-12 leading-relaxed">
                {description}
              </ParagraphBlock>
            )}

            <div className="space-y-6">
              {displayDestinations.map((loc, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-3xl bg-card border-2 border-border shadow-sm hover:border-primary transition-all duration-500 group"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-xl font-bold font-serif mb-1 group-hover:text-primary transition-colors">{loc.name}</h4>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground m-0">Position: {loc.lat ? `${loc.lat}, ${loc.lng}` : 'Regional Area'}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      <MapPin className="size-5" />
                    </div>
                  </div>
                  {loc.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{loc.description}</p>
                  )}
                  <button 
                    onClick={() => window.open(getDirectionsUrl(loc), '_blank')}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline underline-offset-8 transition-all"
                  >
                    <Navigation className="size-3" /> Navigation Protocols →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map Side */}
          <div className={cn(
            "lg:col-span-7 sticky top-32",
            !isSplit && "lg:col-span-full"
          )}>
            <div className="rounded-[2.5rem] overflow-hidden border-2 border-border shadow-2xl bg-muted relative group aspect-video lg:aspect-square">
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
                <div className="size-full">
                  <img
                    src={mapImageUrl || "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200"}
                    alt="Regional Cartography"
                    className="size-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                </div>
              )}
              
              {/* Floating Map Controls UI (Visual Only) */}
              <div className="absolute top-8 right-8 flex flex-col gap-3">
                <div className="p-4 rounded-2xl bg-background/90 backdrop-blur shadow-xl border border-border/50 flex flex-col gap-4">
                  <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
                    <Plus className="size-4" />
                  </div>
                  <div className="w-full h-px bg-border/50" />
                  <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
                    <Minus className="size-4" />
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-background/90 backdrop-blur shadow-xl border border-border/50 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
                  <ExternalLink className="size-5" />
                </div>
              </div>

              {/* Legend Overlay */}
              <div className="absolute bottom-8 left-8 p-6 rounded-2xl bg-background/90 backdrop-blur shadow-xl border border-border/50 max-w-[200px] hidden md:block">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Map Legend</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="size-3 rounded-full bg-primary" />
                    <span className="text-xs font-bold">Primary Site</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-3 rounded-full bg-accent" />
                    <span className="text-xs font-bold">Base Camp</span>
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
