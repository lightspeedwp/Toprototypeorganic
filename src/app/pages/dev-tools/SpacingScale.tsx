/**
 * Spacing Scale — Developer Tool
 *
 * Visualises every spacing token defined in theme-light.css:
 * section spacing, container padding, element spacing, and gap spacing.
 * Each token shows its CSS variable name, clamp() range, and a live
 * visual bar so developers can verify spacing at the current viewport.
 *
 * @module SpacingScale
 * @category dev-tools
 */

import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";

interface SpacingToken {
  variable: string;
  description: string;
  clamp: string;
}

const SECTION_TOKENS: SpacingToken[] = [
  { variable: "--spacing-section-sm", description: "Section small", clamp: "clamp(2rem, 4vw + 1rem, 4rem) → 32–64 px" },
  { variable: "--spacing-section-md", description: "Section medium", clamp: "clamp(3rem, 5vw + 1rem, 6rem) → 48–96 px" },
  { variable: "--spacing-section-lg", description: "Section large", clamp: "clamp(4rem, 6vw + 2rem, 8rem) → 64–128 px" },
  { variable: "--spacing-section-xl", description: "Section x-large", clamp: "clamp(5rem, 8vw + 2rem, 10rem) → 80–160 px" },
];

const CONTAINER_TOKENS: SpacingToken[] = [
  { variable: "--spacing-container-sm", description: "Container small", clamp: "clamp(1rem, 2vw + 0.5rem, 2rem) → 16–32 px" },
  { variable: "--spacing-container-md", description: "Container medium", clamp: "clamp(1.5rem, 3vw + 0.5rem, 3rem) → 24–48 px" },
  { variable: "--spacing-container-lg", description: "Container large", clamp: "clamp(2rem, 4vw + 1rem, 4rem) → 32–64 px" },
];

const ELEMENT_TOKENS: SpacingToken[] = [
  { variable: "--spacing-element-xs", description: "Element x-small", clamp: "clamp(0.5rem, 1vw + 0.25rem, 1rem) → 8–16 px" },
  { variable: "--spacing-element-sm", description: "Element small", clamp: "clamp(0.75rem, 1.5vw + 0.25rem, 1.5rem) → 12–24 px" },
  { variable: "--spacing-element-md", description: "Element medium", clamp: "clamp(1rem, 2vw + 0.5rem, 2rem) → 16–32 px" },
  { variable: "--spacing-element-lg", description: "Element large", clamp: "clamp(1.5rem, 3vw + 0.5rem, 3rem) → 24–48 px" },
];

const GAP_TOKENS: SpacingToken[] = [
  { variable: "--spacing-gap-xs", description: "Gap x-small", clamp: "clamp(0.5rem, 1vw + 0.25rem, 1rem) → 8–16 px" },
  { variable: "--spacing-gap-sm", description: "Gap small", clamp: "clamp(0.75rem, 1.5vw + 0.25rem, 1.5rem) → 12–24 px" },
  { variable: "--spacing-gap-md", description: "Gap medium", clamp: "clamp(1rem, 2vw + 0.5rem, 2rem) → 16–32 px" },
  { variable: "--spacing-gap-lg", description: "Gap large", clamp: "clamp(1.5rem, 3vw + 0.5rem, 3rem) → 24–48 px" },
];

function SpacingGroup({ title, tokens }: { title: string; tokens: SpacingToken[] }) {
  return (
    <div className="mb-12 last:mb-0">
      <h3 className="mb-6">{title}</h3>
      <div className="space-y-4">
        {tokens.map((t) => (
          <div key={t.variable} className="border border-border rounded-lg bg-card p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
              <code className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-sm shrink-0">{t.variable}</code>
              <span className="text-sm text-muted-foreground">{t.clamp}</span>
            </div>
            {/* Visual bar — its height equals the token value at the current viewport */}
            <div className="relative bg-muted rounded-sm overflow-hidden">
              <div
                className="bg-primary/20 border-l-4 border-primary rounded-sm"
                style={{ height: `var(${t.variable})` }}
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                {t.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SpacingScale() {
  return (
    <>
      <DevToolsBreadcrumbs currentPage="Spacing Scale" />

      <section className="py-section-sm bg-muted">
        <Container>
          <h1 className="mb-4">Spacing Scale</h1>
          <p className="text-muted-foreground max-w-3xl">
            All spacing tokens use <code>clamp()</code> for fluid, viewport-responsive spacing.
            The bars below render at the actual token value so you can see how they scale
            as the browser width changes. Resize the window to see fluid scaling in action.
          </p>
        </Container>
      </section>

      <section className="py-section-sm bg-background">
        <Container>
          <SpacingGroup title="Section Spacing" tokens={SECTION_TOKENS} />
          <SpacingGroup title="Container Padding" tokens={CONTAINER_TOKENS} />
          <SpacingGroup title="Element Spacing" tokens={ELEMENT_TOKENS} />
          <SpacingGroup title="Gap Spacing" tokens={GAP_TOKENS} />
        </Container>
      </section>

      {/* Tailwind fixed scale reference */}
      <section className="py-section-sm bg-muted">
        <Container>
          <h2 className="mb-2">Tailwind Fixed Scale (Reference)</h2>
          <p className="text-muted-foreground mb-8">Common Tailwind spacing values used alongside fluid tokens.</p>
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            {[
              { cls: "p-1", px: "4 px" },
              { cls: "p-2", px: "8 px" },
              { cls: "p-3", px: "12 px" },
              { cls: "p-4", px: "16 px" },
              { cls: "p-6", px: "24 px" },
              { cls: "p-8", px: "32 px" },
              { cls: "p-10", px: "40 px" },
              { cls: "p-12", px: "48 px" },
              { cls: "p-16", px: "64 px" },
            ].map((s) => (
              <div key={s.cls} className="flex items-center gap-4 px-6 py-3 border-b border-border last:border-b-0">
                <code className="text-xs text-muted-foreground w-20 shrink-0">{s.cls}</code>
                <span className="text-sm text-muted-foreground w-16 shrink-0">{s.px}</span>
                <div className="flex-1 bg-muted rounded-sm overflow-hidden h-4">
                  <div className={`${s.cls} bg-primary/30 h-full`} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
