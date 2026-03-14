/**
 * Typography Specimens — Developer Tool
 *
 * Displays every heading level, body text, and special typographic elements
 * using the project's design tokens. Lets developers visually verify that
 * the fluid type scale, font families, weights, and line-heights are correct.
 *
 * All styling comes from CSS custom properties via Tailwind semantic classes.
 * Fonts: Lora (serif) for headings, Noto Sans (sans-serif) for body/UI.
 *
 * @module TypographySpecimens
 * @category dev-tools
 */

import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { TextAa } from "@phosphor-icons/react";

/** Token metadata shown beside each specimen. */
interface Specimen {
  label: string;
  tag: string;
  variable: string;
  font: string;
  weight: string;
  content: string;
}

const HEADING_SPECIMENS: Specimen[] = [
  { label: "H1", tag: "h1", variable: "--text-6xl", font: "Lora (serif)", weight: "700 Bold", content: "The quick brown fox jumps over the lazy dog" },
  { label: "H2", tag: "h2", variable: "--text-4xl", font: "Lora (serif)", weight: "600 Semibold", content: "Discover Breathtaking Destinations" },
  { label: "H3", tag: "h3", variable: "--text-3xl", font: "Lora (serif)", weight: "600 Semibold", content: "Explore Our Tour Collections" },
  { label: "H4", tag: "h4", variable: "--text-2xl", font: "Lora (serif)", weight: "500 Medium", content: "Card & Block Headings" },
  { label: "H5", tag: "h5", variable: "--text-xl", font: "Lora (serif)", weight: "500 Medium", content: "Small Section Headings" },
  { label: "H6", tag: "h6", variable: "--text-lg", font: "Lora (serif)", weight: "500 Medium", content: "Smallest Heading Level" },
];

const BODY_SPECIMENS: Specimen[] = [
  { label: "Body (base)", tag: "p", variable: "--text-base", font: "Noto Sans", weight: "400 Normal", content: "Body text at the base size. This is how most paragraph content appears across the site — optimised for comfortable reading at all viewport widths using a fluid clamp() scale." },
  { label: "Small", tag: "small", variable: "--text-sm", font: "Noto Sans", weight: "400 Normal", content: "Small helper text, captions, timestamps, and metadata." },
  { label: "XS", tag: "span", variable: "--text-xs", font: "Noto Sans", weight: "400 Normal", content: "Tiny labels, badges, and legal fine print." },
  { label: "Large", tag: "p", variable: "--text-lg", font: "Noto Sans", weight: "400 Normal", content: "Lead paragraphs and introductory text, slightly larger for emphasis." },
];

function SpecimenRow({ spec }: { spec: Specimen }) {
  const Tag = spec.tag as keyof JSX.IntrinsicElements;

  return (
    <div className="grid gap-4 md:grid-cols-[200px_1fr] items-start py-6 border-b border-border last:border-b-0">
      {/* Meta */}
      <div className="flex flex-col gap-1">
        <span className="inline-block px-2 py-0.5 rounded-sm bg-primary/10 text-primary text-xs pb-1">{spec.label}</span>
        <p className="text-xs text-muted-foreground mb-0"><code className="text-xs">{spec.variable}</code></p>
        <p className="text-xs text-muted-foreground mb-0">{spec.font}</p>
        <p className="text-xs text-muted-foreground mb-0">{spec.weight}</p>
      </div>

      {/* Specimen */}
      <div>
        <Tag className="mb-0">{spec.content}</Tag>
      </div>
    </div>
  );
}

export default function TypographySpecimens() {
  return (
    <>
      <DevToolsBreadcrumbs currentPage="Typography Specimens" />

      <section className="py-section-sm bg-muted border-b border-border">
        <Container>
          <div className="flex flex-col gap-element-sm">
            <div className="wp-page-header__icon-container w-14 h-14 flex items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-primary transition-colors hover:bg-primary/20">
              <TextAa className="w-7 h-7" />
            </div>
            <h1>Typography Specimens</h1>
            <p className="text-muted-foreground max-w-3xl">
              Every heading level and body text size rendered using the project's fluid type scale.
              All values come from CSS custom properties in <code>theme-light.css</code> and are mapped
              through Tailwind's <code>@theme</code> integration in <code>theme.css</code>.
            </p>
          </div>
        </Container>
      </section>

      {/* Headings */}
      <section className="py-section-sm bg-background">
        <Container>
          <h2 className="pb-2">Heading Scale</h2>
          <p className="text-muted-foreground pb-8">Font family: <strong>Lora</strong> (serif) — applied via <code>font-serif</code></p>
          <div className="divide-y divide-border border border-border rounded-lg bg-card p-6">
            {HEADING_SPECIMENS.map((s) => (
              <SpecimenRow key={s.label} spec={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* Body text */}
      <section className="py-section-sm bg-muted">
        <Container>
          <h2 className="pb-2">Body Text Scale</h2>
          <p className="text-muted-foreground pb-8">Font family: <strong>Noto Sans</strong> (sans-serif) — applied via <code>font-sans</code></p>
          <div className="divide-y divide-border border border-border rounded-lg bg-card p-6">
            {BODY_SPECIMENS.map((s) => (
              <SpecimenRow key={s.label} spec={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* Special elements */}
      <section className="py-section-sm bg-background">
        <Container>
          <h2 className="pb-2">Special Elements</h2>
          <p className="text-muted-foreground pb-8">Blockquotes, labels, buttons, code, and links — all styled via semantic HTML rules in <code>theme.css</code>.</p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Blockquote */}
            <div className="border border-border rounded-lg bg-card p-6">
              <h4 className="pb-4">Blockquote</h4>
              <blockquote>
                Travel is the only thing you buy that makes you richer. Every journey transforms you.
              </blockquote>
              <p className="text-xs text-muted-foreground pt-2 mb-0"><code>font-serif</code> · italic · <code>--text-xl</code></p>
            </div>

            {/* Label */}
            <div className="border border-border rounded-lg bg-card p-6">
              <h4 className="pb-4">Labels &amp; Buttons</h4>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="demo-input">Form Label (Lora, medium)</label>
                  <input id="demo-input" type="text" placeholder="Input field (Noto Sans)" className="w-full pt-1 px-3 py-2 border border-border rounded-md bg-input" />
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Button Text (Noto Sans, medium)</button>
              </div>
            </div>

            {/* Code */}
            <div className="border border-border rounded-lg bg-card p-6">
              <h4 className="pb-4">Inline &amp; Block Code</h4>
              <p className="pb-4">Use <code>var(--primary)</code> for the brand colour.</p>
              <pre><code>{`/* Example CSS */\n.card {\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n}`}</code></pre>
            </div>

            {/* Lists */}
            <div className="border border-border rounded-lg bg-card p-6">
              <h4 className="pb-4">Lists</h4>
              <ul>
                <li>Unordered list item one</li>
                <li>Unordered list item two</li>
                <li>Unordered list item three</li>
              </ul>
              <ol>
                <li>Ordered list item one</li>
                <li>Ordered list item two</li>
                <li>Ordered list item three</li>
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Font weight scale */}
      <section className="py-section-sm bg-muted">
        <Container>
          <h2 className="pb-2">Font Weight Scale</h2>
          <p className="text-muted-foreground pb-8">Available weights mapped to CSS custom properties.</p>
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            {[
              { label: "Light (300)", variable: "--font-weight-light", cls: "font-light" },
              { label: "Normal (400)", variable: "--font-weight-normal", cls: "font-normal" },
              { label: "Medium (500)", variable: "--font-weight-medium", cls: "font-medium" },
              { label: "Semibold (600)", variable: "--font-weight-semibold", cls: "font-semibold" },
              { label: "Bold (700)", variable: "--font-weight-bold", cls: "font-bold" },
            ].map((w) => (
              <div key={w.label} className="flex items-center gap-4 px-6 py-4 border-b border-border last:border-b-0">
                <code className="text-xs text-muted-foreground w-48 shrink-0">{w.variable}</code>
                <span className={`${w.cls} flex-1`}>The quick brown fox — {w.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}