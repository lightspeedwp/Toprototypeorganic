/**
 * Border Radius Specimens — Developer Tool
 *
 * Displays every border-radius token from the design system, from the
 * smallest 2 px to the pill-shaped full radius, rendered on identical
 * shapes so the difference is immediately visible.
 *
 * @module RadiusSpecimens
 * @category dev-tools
 */

import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";

interface RadiusToken {
  variable: string;
  label: string;
  value: string;
}

const RADIUS_TOKENS: RadiusToken[] = [
  { variable: "--radius-sm", label: "sm", value: "2 px" },
  { variable: "--radius-md", label: "md", value: "4 px" },
  { variable: "--radius-lg", label: "lg", value: "6 px" },
  { variable: "--radius-xl", label: "xl", value: "8 px" },
  { variable: "--radius-2xl", label: "2xl", value: "12 px" },
  { variable: "--radius-3xl", label: "3xl", value: "16 px" },
  { variable: "--radius-full", label: "full", value: "9999 px" },
];

export default function RadiusSpecimens() {
  return (
    <>
      <DevToolsBreadcrumbs currentPage="Border Radius Specimens" />

      <section className="py-section-sm bg-muted">
        <Container>
          <h1 className="mb-4">Border Radius Specimens</h1>
          <p className="text-muted-foreground max-w-3xl">
            The radius scale is defined in <code>theme-light.css</code> and mapped into
            Tailwind's <code>rounded-*</code> utilities via <code>theme.css</code>.
            Each specimen below shows a 120 &times; 80 px rectangle with the respective radius applied.
          </p>
        </Container>
      </section>

      {/* Specimen grid */}
      <section className="py-section-sm bg-background">
        <Container>
          <h2 className="mb-8">Radius Scale</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {RADIUS_TOKENS.map((t) => (
              <div key={t.variable} className="border border-border rounded-lg bg-card p-6 text-center">
                {/* Visual specimen */}
                <div className="flex items-center justify-center mb-4">
                  <div
                    className="w-[120px] h-[80px] bg-primary/20 border-2 border-primary"
                    style={{ borderRadius: `var(${t.variable})` }}
                  />
                </div>
                {/* Token info */}
                <span className="inline-block px-2 py-0.5 rounded-sm bg-primary/10 text-primary text-xs mb-2">{t.label}</span>
                <p className="text-sm mb-1"><code className="text-xs">{t.variable}</code></p>
                <p className="text-xs text-muted-foreground mb-0">{t.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Applied to UI elements */}
      <section className="py-section-sm bg-muted">
        <Container>
          <h2 className="mb-8">Applied to UI Elements</h2>
          <p className="text-muted-foreground mb-8">See how each radius looks on common UI elements.</p>

          <div className="space-y-8">
            {/* Buttons */}
            <div>
              <h3 className="mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                {RADIUS_TOKENS.map((t) => (
                  <button
                    key={t.variable}
                    className="px-4 py-2 bg-primary text-primary-foreground text-sm"
                    style={{ borderRadius: `var(${t.variable})` }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="mb-4">Cards</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {RADIUS_TOKENS.filter(t => !["sm", "full"].includes(t.label)).map((t) => (
                  <div
                    key={t.variable}
                    className="bg-card border border-border p-4"
                    style={{ borderRadius: `var(${t.variable})` }}
                  >
                    <h5 className="mb-1">radius-{t.label}</h5>
                    <p className="text-sm text-muted-foreground mb-0">{t.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div>
              <h3 className="mb-4">Inputs</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl">
                {RADIUS_TOKENS.filter(t => ["sm", "md", "lg", "xl", "full"].includes(t.label)).map((t) => (
                  <div key={t.variable}>
                    <label className="text-sm mb-1 block">radius-{t.label}</label>
                    <input
                      type="text"
                      placeholder={t.value}
                      className="w-full px-3 py-2 border border-border bg-input"
                      style={{ borderRadius: `var(${t.variable})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tailwind mapping */}
      <section className="py-section-sm bg-background">
        <Container>
          <h2 className="mb-6">Tailwind Mapping</h2>
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            <div className="grid grid-cols-3 gap-0 text-sm border-b border-border bg-muted px-6 py-3">
              <span className="text-muted-foreground">Tailwind Class</span>
              <span className="text-muted-foreground">CSS Variable</span>
              <span className="text-muted-foreground">Computed</span>
            </div>
            {[
              { tw: "rounded-sm", css: "--radius-sm", val: "2 px" },
              { tw: "rounded-md", css: "--radius-md (--radius)", val: "4 px" },
              { tw: "rounded-lg", css: "--radius-lg", val: "6 px" },
              { tw: "rounded-xl", css: "--radius-xl", val: "8 px" },
              { tw: "rounded-full", css: "--radius-full", val: "9999 px" },
            ].map((row) => (
              <div key={row.tw} className="grid grid-cols-3 gap-0 px-6 py-3 border-b border-border last:border-b-0">
                <code className="text-xs">{row.tw}</code>
                <code className="text-xs text-muted-foreground">{row.css}</code>
                <span className="text-sm text-muted-foreground">{row.val}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
