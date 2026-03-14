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
        <div className="flex flex-col md:flex-row justify-between items-end gap-fluid-2xl pb-fluid-3xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-fluid-md pb-element-lg">
              <div className="p-element-sm rounded-[var(--radius-lg)] bg-primary/10 text-primary">
                <Bed
                  className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]"
                />
              </div>
              <HeadingBlock level={2} className="!m-0">
                {title}
              </HeadingBlock>
            </div>
            {description && (
              <ParagraphBlock className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] text-fluid-lg !m-0">
                {description}
              </ParagraphBlock>
            )}
          </div>
        </div>

        {variant === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-2xl md:gap-fluid-3xl">
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
                      <div className="absolute bottom-[var(--spacing-element-lg)] left-[var(--spacing-element-lg)] bg-[color:var(--color-background)]/90 backdrop-blur-md px-element-lg py-element-sm rounded-[var(--radius-xl)] shadow-[var(--elevation-lg)] border border-[color:var(--color-border)]/50 flex items-baseline gap-element-sm">
                        <span className="text-[color:var(--color-primary)] text-[length:var(--text-xl)]">{currency}{room.price}</span>
                        <span className="text-[length:var(--text-xs)] uppercase tracking-widest text-[color:var(--color-muted-foreground)]">{priceUnit}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-element-3xl flex flex-col flex-1">
                  <div className="flex items-start justify-between pb-element-lg">
                    <h3 className="text-fluid-2xl !m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)]">
                      {room.name}
                    </h3>
                    {room.capacity && (
                      <div className="flex items-center gap-fluid-sm px-element-md py-element-xs rounded-[var(--radius-full)] bg-[color:var(--color-muted)] text-[color:var(--color-muted-foreground)]">
                        <Users className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" />
                        <span className="text-fluid-xs uppercase tracking-widest font-[family:var(--font-family-noto-sans)]">{room.capacity} Guests</span>
                      </div>
                    )}
                  </div>

                  <ParagraphBlock className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] leading-relaxed pb-element-2xl flex-1 !m-0">
                    {room.description}
                  </ParagraphBlock>

                  {/* Amenities */}
                  {room.amenities && (
                    <div className="flex flex-wrap gap-fluid-sm pb-fluid-2xl">
                      {room.amenities.map((a, i) => (
                        <span key={i} className="px-element-md py-element-xs rounded-[var(--radius-lg)] bg-[color:var(--color-primary)]/5 text-[color:var(--color-primary)] text-fluid-xs uppercase tracking-widest flex items-center gap-fluid-xs font-[family:var(--font-family-noto-sans)]">
                          <CircleCheck className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" /> {a}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-element-2xl border-t border-border/50 flex items-center justify-between">
                    {room.availability && (
                      <span className={cn(
                        "px-element-md py-element-xs rounded-[var(--radius-full)] text-fluid-xs uppercase tracking-widest",
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
                    <th className="px-element-3xl py-element-2xl text-foreground text-fluid-lg">Room Type</th>
                    <th className="px-element-3xl py-element-2xl text-foreground text-fluid-lg text-center">Capacity</th>
                    <th className="px-element-3xl py-element-2xl text-foreground text-fluid-lg text-right">Investment</th>
                    <th className="px-element-3xl py-element-2xl text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-element-3xl py-element-2xl">
                        <p className="text-[color:var(--color-foreground)] font-[family:var(--font-family-noto-sans)] pb-element-xs m-0 text-fluid-lg">{room.name}</p>
                        <p className="text-fluid-sm font-[family:var(--font-family-noto-sans)] text-[color:var(--color-muted-foreground)] m-0 max-w-md">{room.description}</p>
                      </td>
                      <td className="px-element-3xl py-element-2xl text-center">
                        <div className="inline-flex items-center gap-fluid-sm text-muted-foreground">
                          <Users className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)]" />
                          <span className="">{room.capacity}</span>
                        </div>
                      </td>
                      <td className="px-element-3xl py-element-2xl text-right">
                        <div className="text-primary text-fluid-xl">
                          {currency}{room.price}
                        </div>
                        <div className="text-fluid-xs uppercase tracking-widest text-muted-foreground">
                          {priceUnit}
                        </div>
                      </td>
                      <td className="px-element-3xl py-element-2xl text-center">
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