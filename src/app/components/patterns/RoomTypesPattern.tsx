/**
 * Room Types Pattern Component
 * 
 * Displays accommodation room options in card or table formats.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Button } from "../blocks/design/Button";
import { Users, Bed, CheckCircle as CircleCheck } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

export interface RoomType {
  id: string;
  name: string;
  description: string;
  image?: string;
  price?: string | number;
  capacity?: number;
  amenities?: string[];
  availability?: 'available' | 'limited' | 'unavailable';
}

export interface RoomTypesPatternProps {
  title?: string;
  description?: string;
  rooms: RoomType[];
  currency?: string;
  priceUnit?: string;
  cta?: {
    label: string;
    onClick: (roomId: string) => void;
  };
  variant?: 'cards' | 'table';
  className?: string;
}

const statusClasses = {
  available: "text-success bg-success/10",
  limited: "text-warning bg-warning/10",
  unavailable: "text-muted-foreground bg-muted",
};

export function RoomTypesPattern({
  title = "Our Sanctuaries",
  description,
  rooms,
  currency = "$",
  priceUnit = "per night",
  cta,
  variant = 'cards',
  className,
}: RoomTypesPatternProps) {
  return (
    <section className={cn("wp-pattern-lts-rooms has-section-padding-md", className)}>
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-[var(--radius-lg)] bg-primary/10 text-primary">
                <Bed className="size-5" />
              </div>
              <HeadingBlock level={2} className="mb-0">
                {title}
              </HeadingBlock>
            </div>
            {description && (
              <ParagraphBlock className="text-muted-foreground text-fluid-lg m-0">
                {description}
              </ParagraphBlock>
            )}
          </div>
        </div>

        {variant === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {rooms.map((room, idx) => (
              <motion.article 
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="wp-pattern-lts-rooms__item group flex flex-col bg-card border-2 border-border rounded-[var(--radius-3xl)] overflow-hidden hover:border-primary transition-all duration-500 shadow-sm hover:shadow-[var(--elevation-2xl)]"
              >
                {/* Image */}
                {room.image && (
                  <div className="wp-pattern-lts-rooms__media aspect-[4/3] overflow-hidden relative">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="absolute inset-0 size-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {room.price && (
                      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md px-4 py-2 rounded-[var(--radius-xl)] shadow-[var(--elevation-lg)] border border-border/50">
                        <span className="text-primary text-fluid-xl">{currency}{room.price}</span>
                        <span className="text-fluid-xs uppercase tracking-widest text-muted-foreground ml-2">{priceUnit}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-fluid-2xl mb-0">
                      {room.name}
                    </h3>
                    {room.capacity && (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-[var(--radius-full)] bg-muted text-muted-foreground">
                        <Users className="size-3" />
                        <span className="text-fluid-xs uppercase tracking-widest">{room.capacity} Guests</span>
                      </div>
                    )}
                  </div>

                  <ParagraphBlock className="text-muted-foreground leading-relaxed mb-6 flex-1">
                    {room.description}
                  </ParagraphBlock>

                  {/* Amenities */}
                  {room.amenities && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {room.amenities.map((a, i) => (
                        <span key={i} className="px-3 py-1 rounded-[var(--radius-lg)] bg-primary/5 text-primary text-fluid-xs uppercase tracking-widest flex items-center gap-1.5">
                          <CircleCheck className="size-3" /> {a}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                    {room.availability && (
                      <span className={cn(
                        "px-3 py-1 rounded-[var(--radius-full)] text-fluid-xs uppercase tracking-widest",
                        statusClasses[room.availability]
                      )}>
                        {room.availability}
                      </span>
                    )}
                    {cta && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => cta.onClick(room.id)}
                        className="rounded-[var(--radius-lg)]"
                        disabled={room.availability === 'unavailable'}
                      >
                        {cta.label}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="wp-pattern-lts-rooms__table-container bg-card border-2 border-border rounded-[var(--radius-3xl)] overflow-hidden shadow-[var(--elevation-sm)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted border-b-2 border-border">
                    <th className="px-8 py-6 text-foreground text-fluid-lg">Room Type</th>
                    <th className="px-8 py-6 text-foreground text-fluid-lg text-center">Capacity</th>
                    <th className="px-8 py-6 text-foreground text-fluid-lg text-right">Investment</th>
                    <th className="px-8 py-6 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-8 py-6">
                        <p className="text-foreground mb-1 text-fluid-lg">{room.name}</p>
                        <p className="text-fluid-sm text-muted-foreground m-0 max-w-md">{room.description}</p>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="inline-flex items-center gap-2 text-muted-foreground">
                          <Users className="size-4" />
                          <span className="">{room.capacity}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="text-primary text-fluid-xl">
                          {currency}{room.price}
                        </div>
                        <div className="text-fluid-xs uppercase tracking-widest text-muted-foreground">
                          {priceUnit}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        {cta && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cta.onClick(room.id)}
                            className="rounded-[var(--radius-lg)]"
                            disabled={room.availability === 'unavailable'}
                          >
                            {cta.label}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export default RoomTypesPattern;