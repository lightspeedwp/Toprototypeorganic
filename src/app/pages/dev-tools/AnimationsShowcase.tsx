/**
 * Animations Showcase — Developer Tool
 *
 * Demonstrates animation patterns used in the system: entrance transitions,
 * hover micro-interactions, loading skeletons, and scroll-triggered reveals.
 * Uses the `motion` package (Motion, formerly Framer Motion) for all animation.
 *
 * All styling uses design system CSS variables — no hardcoded colours.
 *
 * @module AnimationsShowcase
 * @category dev-tools
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { ArrowsClockwise as RotateCw, Sparkle } from "@phosphor-icons/react";

/** A single animation demo block. */
function AnimationCard({
  title,
  description,
  children,
  onReset,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  onReset?: () => void;
}) {
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h4 className="mb-0">{title}</h4>
          <p className="text-sm text-muted-foreground mb-0">{description}</p>
        </div>
        {onReset && (
          <button
            onClick={onReset}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Reset animation"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="p-6 flex items-center justify-center min-h-[200px] bg-muted/30">
        {children}
      </div>
    </div>
  );
}

export default function AnimationsShowcase() {
  const [fadeKey, setFadeKey] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [scaleKey, setScaleKey] = useState(0);
  const [staggerKey, setStaggerKey] = useState(0);

  return (
    <>
      <DevToolsBreadcrumbs currentPage="Animations" />

      <section className="py-section-sm bg-muted border-b border-border">
        <Container>
          <div className="flex flex-col gap-element-sm">
            <div className="wp-page-header__icon-container w-14 h-14 flex items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-primary transition-colors hover:bg-primary/20">
              <Sparkle className="w-7 h-7" />
            </div>
            <h1>Animations</h1>
            <p className="text-muted-foreground max-w-3xl">
              Animation specimens using the <strong>Motion</strong> library.
              All transitions respect the design system tokens for colours and spacing.
              Click the reset button on each card to replay the animation.
            </p>
          </div>
        </Container>
      </section>

      {/* Entrance animations */}
      <section className="py-section-sm bg-background">
        <Container>
          <h2 className="pb-8">Entrance Animations</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Fade in */}
            <AnimationCard
              title="Fade In"
              description="opacity 0 → 1 over 600 ms"
              onReset={() => setFadeKey((k) => k + 1)}
            >
              <motion.div
                key={fadeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-48 h-24 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center"
              >
                <span className="text-sm text-primary">Fade In</span>
              </motion.div>
            </AnimationCard>

            {/* Slide up */}
            <AnimationCard
              title="Slide Up"
              description="translateY(24px) → 0 + fade"
              onReset={() => setSlideKey((k) => k + 1)}
            >
              <motion.div
                key={slideKey}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-48 h-24 wp-bg-accent-light border-2 border-accent rounded-lg flex items-center justify-center"
              >
                <span className="text-sm text-accent">Slide Up</span>
              </motion.div>
            </AnimationCard>

            {/* Scale in */}
            <AnimationCard
              title="Scale In"
              description="scale(0.8) → 1 + fade"
              onReset={() => setScaleKey((k) => k + 1)}
            >
              <motion.div
                key={scaleKey}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-48 h-24 bg-secondary/20 border-2 border-secondary rounded-lg flex items-center justify-center"
              >
                <span className="text-sm text-secondary">Scale In</span>
              </motion.div>
            </AnimationCard>

            {/* Stagger children */}
            <AnimationCard
              title="Stagger Children"
              description="0.1 s delay between children"
              onReset={() => setStaggerKey((k) => k + 1)}
            >
              <motion.div
                key={staggerKey}
                className="flex gap-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-12 h-12 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-sm"
                  >
                    {i}
                  </motion.div>
                ))}
              </motion.div>
            </AnimationCard>
          </div>
        </Container>
      </section>

      {/* Hover micro-interactions */}
      <section className="py-section-sm bg-muted">
        <Container>
          <h2 className="pb-8">Hover Micro-interactions</h2>
          <p className="text-muted-foreground pb-8">Hover or focus each element to trigger the interaction.</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Lift */}
            <motion.div
              whileHover={{ y: -4, boxShadow: "var(--elevation-lg)" }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-lg p-6 text-center cursor-pointer"
              style={{ boxShadow: "var(--elevation-sm)" }}
            >
              <h5 className="pb-1">Lift</h5>
              <p className="text-sm text-muted-foreground mb-0">translateY(-4px) + shadow</p>
            </motion.div>

            {/* Scale */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-lg p-6 text-center cursor-pointer"
            >
              <h5 className="pb-1">Scale</h5>
              <p className="text-sm text-muted-foreground mb-0">scale(1.03)</p>
            </motion.div>

            {/* Glow border */}
            <motion.div
              whileHover={{ borderColor: "var(--primary)" }}
              transition={{ duration: 0.3 }}
              className="bg-card border-2 border-border rounded-lg p-6 text-center cursor-pointer"
            >
              <h5 className="pb-1">Border Glow</h5>
              <p className="text-sm text-muted-foreground mb-0">border → primary</p>
            </motion.div>

            {/* Background tint */}
            <motion.div
              whileHover={{ backgroundColor: "var(--muted)" }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-lg p-6 text-center cursor-pointer"
            >
              <h5 className="pb-1">Background Tint</h5>
              <p className="text-sm text-muted-foreground mb-0">bg → muted</p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Loading skeletons */}
      <section className="py-section-sm bg-background">
        <Container>
          <h2 className="pb-8">Loading Skeletons</h2>
          <p className="text-muted-foreground pb-8">
            Pulse animation using Tailwind's <code>animate-pulse</code> for content placeholders.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card skeleton */}
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              <div className="h-48 bg-muted animate-pulse" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-4 bg-muted rounded-sm animate-pulse w-3/4" />
                <div className="h-3 bg-muted rounded-sm animate-pulse w-full" />
                <div className="h-3 bg-muted rounded-sm animate-pulse w-5/6" />
                <div className="flex gap-2 pt-4">
                  <div className="h-6 bg-muted rounded-full animate-pulse w-16" />
                  <div className="h-6 bg-muted rounded-full animate-pulse w-20" />
                </div>
              </div>
            </div>

            {/* List skeleton */}
            <div className="border border-border rounded-lg bg-card p-6 flex flex-col gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full animate-pulse shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-3 bg-muted rounded-sm animate-pulse w-3/4" />
                    <div className="h-2 bg-muted rounded-sm animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>

            {/* Text skeleton */}
            <div className="border border-border rounded-lg bg-card p-6 flex flex-col gap-3">
              <div className="h-6 bg-muted rounded-sm animate-pulse w-1/2" />
              <div className="h-3 bg-muted rounded-sm animate-pulse w-full" />
              <div className="h-3 bg-muted rounded-sm animate-pulse w-full" />
              <div className="h-3 bg-muted rounded-sm animate-pulse w-4/5" />
              <div className="h-3 bg-muted rounded-sm animate-pulse w-full" />
              <div className="h-3 bg-muted rounded-sm animate-pulse w-3/4" />
              <div className="pt-4 h-10 bg-muted rounded-md animate-pulse w-32" />
            </div>
          </div>
        </Container>
      </section>

      {/* Transition tokens */}
      <section className="py-section-sm bg-muted">
        <Container>
          <h2 className="pb-6">Recommended Transition Durations</h2>
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            <div className="grid grid-cols-3 gap-0 text-sm border-b border-border bg-muted px-6 py-3">
              <span className="text-muted-foreground">Context</span>
              <span className="text-muted-foreground">Duration</span>
              <span className="text-muted-foreground">Easing</span>
            </div>
            {[
              { context: "Micro (hover, focus)", duration: "150–200 ms", easing: "ease-out" },
              { context: "Standard (fade, slide)", duration: "300–400 ms", easing: "ease-out" },
              { context: "Entrance (page elements)", duration: "500–600 ms", easing: "ease-out" },
              { context: "Complex (stagger, sequence)", duration: "600–800 ms total", easing: "ease-in-out" },
            ].map((row) => (
              <div key={row.context} className="grid grid-cols-3 gap-0 px-6 py-3 border-b border-border last:border-b-0">
                <span className="text-sm">{row.context}</span>
                <code className="text-xs text-muted-foreground">{row.duration}</code>
                <code className="text-xs text-muted-foreground">{row.easing}</code>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}