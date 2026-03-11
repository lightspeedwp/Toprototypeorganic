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
        <div className="flex flex-col md:flex-row justify-between items-end gap-[var(--spacing-gap-2xl)] mb-[var(--spacing-gap-3xl)]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-[var(--spacing-gap-md)] mb-[var(--spacing-element-lg)]">
              <div className="p-[var(--spacing-element-sm)] rounded-[var(--radius-lg)] bg-primary/10 text-primary">
                <Bed className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" />
              </div>
              <HeadingBlock level={2} className="!mb-0">
                {title}
              </HeadingBlock>
            </div>
            {description && (
              <ParagraphBlock className="text-muted-foreground text-fluid-lg !mb-0">
                {description}
              </ParagraphBlock>
            )}
          </div>
        </div>

        {variant === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-gap-2xl)] md:gap-[var(--spacing-gap-3xl)]">
            {rooms.map((room, idx) => (
              <motion.article 
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="wp-pattern-lts-rooms__item group flex flex-col bg-card border-2 border-border rounded-[var(--radius-3xl)] overflow-hidden hover:border-primary transition-all duration-500 shadow-[var(--elevation-sm)] hover:shadow-[var(--elevation-2xl)]"
              >
                {/* Image */}
                {room.image && (
                  <div className="wp-pattern-lts-rooms__media aspect-[4/3] overflow-hidden relative">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {room.price && (
                      <div className="absolute bottom-[var(--spacing-element-lg)] left-[var(--spacing-element-lg)] bg-background/90 backdrop-blur-md px-[var(--spacing-element-lg)] py-[var(--spacing-element-sm)] rounded-[var(--radius-xl)] shadow-[var(--elevation-lg)] border border-border/50">
                        <span className="text-primary text-fluid-xl">{currency}{room.price}</span>
                        <span className="text-fluid-xs uppercase tracking-widest text-muted-foreground ml-[var(--spacing-element-sm)]">{priceUnit}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-[var(--spacing-element-3xl)] flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-[var(--spacing-element-lg)]">
                    <h3 className="text-fluid-2xl !mb-0">
                      {room.name}
                    </h3>
                    {room.capacity && (
                      <div className="flex items-center gap-[var(--spacing-gap-sm)] px-[var(--spacing-element-md)] py-[var(--spacing-element-xs)] rounded-[var(--radius-full)] bg-muted text-muted-foreground">
                        <Users className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" />
                        <span className="text-fluid-xs uppercase tracking-widest">{room.capacity} Guests</span>
                      </div>
                    )}
                  </div>

                  <ParagraphBlock className="text-muted-foreground leading-relaxed mb-[var(--spacing-element-2xl)] flex-1">
                    {room.description}
                  </ParagraphBlock>

                  {/* Amenities */}
                  {room.amenities && (
                    <div className="flex flex-wrap gap-[var(--spacing-gap-sm)] mb-[var(--spacing-gap-2xl)]">
                      {room.amenities.map((a, i) => (
                        <span key={i} className="px-[var(--spacing-element-md)] py-[var(--spacing-element-xs)] rounded-[var(--radius-lg)] bg-primary/5 text-primary text-fluid-xs uppercase tracking-widest flex items-center gap-[var(--spacing-gap-xs)]">
                          <CircleCheck className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" /> {a}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-[var(--spacing-element-2xl)] border-t border-border/50 flex items-center justify-between">
                    {room.availability && (
                      <span className={cn(
                        "px-[var(--spacing-element-md)] py-[var(--spacing-element-xs)] rounded-[var(--radius-full)] text-fluid-xs uppercase tracking-widest",
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
                    <th className="px-[var(--spacing-element-3xl)] py-[var(--spacing-element-2xl)] text-foreground text-fluid-lg">Room Type</th>
                    <th className="px-[var(--spacing-element-3xl)] py-[var(--spacing-element-2xl)] text-foreground text-fluid-lg text-center">Capacity</th>
                    <th className="px-[var(--spacing-element-3xl)] py-[var(--spacing-element-2xl)] text-foreground text-fluid-lg text-right">Investment</th>
                    <th className="px-[var(--spacing-element-3xl)] py-[var(--spacing-element-2xl)] text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-[var(--spacing-element-3xl)] py-[var(--spacing-element-2xl)]">
                        <p className="text-foreground mb-[var(--spacing-element-xs)] text-fluid-lg">{room.name}</p>
                        <p className="text-fluid-sm text-muted-foreground !mb-0 max-w-md">{room.description}</p>
                      </td>
                      <td className="px-[var(--spacing-element-3xl)] py-[var(--spacing-element-2xl)] text-center">
                        <div className="inline-flex items-center gap-[var(--spacing-gap-sm)] text-muted-foreground">
                          <Users className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" />
                          <span className="">{room.capacity}</span>
                        </div>
                      </td>
                      <td className="px-[var(--spacing-element-3xl)] py-[var(--spacing-element-2xl)] text-right">
                        <div className="text-primary text-fluid-xl">
                          {currency}{room.price}
                        </div>
                        <div className="text-fluid-xs uppercase tracking-widest text-muted-foreground">
                          {priceUnit}
                        </div>
                      </td>
                      <td className="px-[var(--spacing-element-3xl)] py-[var(--spacing-element-2xl)] text-center">
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