/**
 * Design Tokens Reference Page
 * 
 * Interactive reference for all design tokens available in the system.
 * Useful for developers to quickly see and copy token classes.
 * 
 * @module DesignTokensReference
 * @category dev-tools
 */

import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";

interface TokenCategory {
  name: string;
  description: string;
  tokens: TokenItem[];
}

interface TokenItem {
  name: string;
  class: string;
  value?: string;
  description?: string;
  example?: React.ReactNode;
}

export default function DesignTokensReference() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const colorTokens: TokenCategory = {
    name: "Colors",
    description: "Semantic color tokens that adapt to light/dark mode",
    tokens: [
      {
        name: "Background",
        class: "bg-background text-foreground",
        description: "Main page background",
        example: <div className="bg-background text-foreground p-4 rounded border border-border">Background</div>
      },
      {
        name: "Foreground",
        class: "bg-foreground text-background",
        description: "Main foreground color",
        example: <div className="bg-foreground text-background p-4 rounded">Foreground</div>
      },
      {
        name: "Card",
        class: "bg-card text-card-foreground",
        description: "Card backgrounds",
        example: <div className="bg-card text-card-foreground p-4 rounded border border-border">Card</div>
      },
      {
        name: "Primary",
        class: "bg-primary text-primary-foreground",
        description: "Primary brand color",
        example: <div className="bg-primary text-primary-foreground p-4 rounded">Primary</div>
      },
      {
        name: "Secondary",
        class: "bg-secondary text-secondary-foreground",
        description: "Secondary actions",
        example: <div className="bg-secondary text-secondary-foreground p-4 rounded">Secondary</div>
      },
      {
        name: "Muted",
        class: "bg-muted text-muted-foreground",
        description: "Subtle backgrounds",
        example: <div className="bg-muted text-muted-foreground p-4 rounded">Muted</div>
      },
      {
        name: "Accent",
        class: "bg-accent text-accent-foreground",
        description: "Highlighted areas",
        example: <div className="bg-accent text-accent-foreground p-4 rounded">Accent</div>
      },
      {
        name: "Destructive",
        class: "bg-destructive text-destructive-foreground",
        description: "Destructive actions",
        example: <div className="bg-destructive text-destructive-foreground p-4 rounded">Destructive</div>
      },
    ]
  };

  const spacingTokens: TokenCategory = {
    name: "Spacing & Layout",
    description: "Fluid spacing, block gaps, and WordPress layout constants",
    tokens: [
      { name: "Fluid Gap XS", class: "gap-fluid-xs", value: "clamp(0.5rem, 1vw + 0.25rem, 1.25rem)", description: "8-20px fluid" },
      { name: "Fluid Gap SM", class: "gap-fluid-sm", value: "clamp(0.75rem, 1.5vw + 0.25rem, 2rem)", description: "12-32px fluid" },
      { name: "Fluid Gap MD / Block Gap", class: "gap-fluid-md", value: "clamp(1rem, 2vw + 0.5rem, 3rem)", description: "Zero-margin block gap (16-48px fluid)" },
      { name: "Fluid Gap LG", class: "gap-fluid-lg", value: "clamp(1.5rem, 3vw + 0.5rem, 4.5rem)", description: "24-72px fluid" },
      { name: "Fluid Section SM", class: "py-section-sm", value: "clamp(2rem, 4vw + 0.5rem, 4rem)", description: "32-64px fluid" },
      { name: "Fluid Section MD", class: "py-section-md", value: "clamp(3rem, 5vw + 1rem, 6rem)", description: "48-96px fluid" },
      { name: "Fluid Section LG", class: "py-section-lg", value: "clamp(4rem, 6vw + 2rem, 8rem)", description: "64-128px fluid" },
      { name: "Content Size", class: "max-w-[var(--wp--style--global--content-size)]", value: "800px", description: "Default WordPress content width" },
      { name: "Wide Size", class: "max-w-[var(--wp--style--global--wide-size)]", value: "1800px", description: "WordPress wide alignment" },
      { name: "Touch Target Min", class: "min-h-[var(--touch-target-min)]", value: "44px", description: "Accessible UI standard" },
      { name: "UI Height MD", class: "h-[var(--ui-height-md)]", value: "44px", description: "Standard component height" },
    ]
  };

  const typographyTokens: TokenCategory = {
    name: "Typography",
    description: "Semantic HTML sizing - DO NOT use text-* classes on headings",
    tokens: [
      { 
        name: "Heading 1", 
        class: "<h1>", 
        value: "clamp(2.5rem, 3vw + 1.5rem, 4.5rem)",
        description: "48-72px, Lora, Bold (700)",
        example: <h1>Heading 1</h1>
      },
      { 
        name: "Heading 2", 
        class: "<h2>", 
        value: "clamp(1.875rem, 2vw + 1rem, 3rem)",
        description: "30-48px, Lora, Semibold (600)",
        example: <h2>Heading 2</h2>
      },
      { 
        name: "Heading 3", 
        class: "<h3>", 
        value: "clamp(1.5rem, 1.5vw + 0.75rem, 2.25rem)",
        description: "24-36px, Lora, Semibold (600)",
        example: <h3>Heading 3</h3>
      },
      { 
        name: "Heading 4", 
        class: "<h4>", 
        value: "clamp(1.25rem, 1vw + 0.5rem, 1.5rem)",
        description: "20-24px, Lora, Medium (500)",
        example: <h4>Heading 4</h4>
      },
      { 
        name: "Body", 
        class: "<p>", 
        value: "clamp(1rem, 0.5vw + 0.75rem, 1.125rem)",
        description: "16-18px, Noto Sans, Normal (400)",
        example: <p>Body text paragraph</p>
      },
    ]
  };

  const borderTokens: TokenCategory = {
    name: "Borders & Radius",
    description: "Border styles and border radius tokens",
    tokens: [
      { name: "Border", class: "border border-border", description: "Default border" },
      { name: "Border 2px", class: "border-2 border-border", description: "Thicker border" },
      { name: "Radius SM", class: "rounded-sm", value: "var(--radius-sm) = 2px" },
      { name: "Radius MD", class: "rounded-md", value: "var(--radius-md) = 4px" },
      { name: "Radius LG", class: "rounded-lg", value: "var(--radius-lg) = 6px" },
      { name: "Radius XL", class: "rounded-xl", value: "var(--radius-xl) = 8px" },
      { name: "Radius Full", class: "rounded-full", description: "Fully rounded" },
    ]
  };

  const shadowTokens: TokenCategory = {
    name: "Shadows",
    description: "Elevation and shadow tokens",
    tokens: [
      { 
        name: "Shadow SM", 
        class: "shadow-sm", 
        value: "var(--elevation-sm)",
        description: "Subtle shadow",
        example: <div className="bg-card p-4 rounded shadow-sm border border-border">Shadow SM</div>
      },
      { 
        name: "Shadow Base", 
        class: "shadow", 
        description: "Default shadow",
        example: <div className="bg-card p-4 rounded shadow border border-border">Shadow</div>
      },
      { 
        name: "Shadow MD", 
        class: "shadow-md", 
        description: "Medium shadow",
        example: <div className="bg-card p-4 rounded shadow-md border border-border">Shadow MD</div>
      },
      { 
        name: "Shadow LG", 
        class: "shadow-lg", 
        description: "Large shadow",
        example: <div className="bg-card p-4 rounded shadow-lg border border-border">Shadow LG</div>
      },
    ]
  };

  const categories = [colorTokens, spacingTokens, typographyTokens, borderTokens, shadowTokens];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <DevToolsBreadcrumbs currentPage="Design Tokens Reference" />
      {/* Header */}
      <div className="bg-muted border-b border-border py-section-sm">
        <Container>
          <h1>Design Tokens Reference</h1>
          <p className="text-muted-foreground mt-4">
            Complete reference of all design tokens available in the system.
            Click any class name to copy it to your clipboard.
          </p>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-section-sm">
        <div className="space-y-12">
          {categories.map((category, idx) => (
            <section key={idx} className="bg-card p-8 rounded-lg border border-border">
              <h2 className="mb-2">{category.name}</h2>
              <p className="text-muted-foreground mb-6">
                {category.description}
              </p>

              <div className="space-y-4">
                {category.tokens.map((token, tokenIdx) => (
                  <div 
                    key={tokenIdx}
                    className="bg-muted p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium">{token.name}</span>
                          {token.value && (
                            <code className="text-sm text-muted-foreground bg-background px-2 py-1 rounded">
                              {token.value}
                            </code>
                          )}
                        </div>
                        
                        <button
                          onClick={() => copyToClipboard(token.class)}
                          className="flex items-center gap-2 bg-background px-3 py-2 rounded border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <code className="text-sm">{token.class}</code>
                          {copiedToken === token.class ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        
                        {token.description && (
                          <p className="text-sm text-muted-foreground">
                            {token.description}
                          </p>
                        )}
                      </div>

                      {token.example && (
                        <div className="flex-shrink-0">
                          {token.example}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Usage Guidelines */}
          <section className="bg-accent text-accent-foreground p-8 rounded-lg">
            <h2 className="mb-4">Usage Guidelines</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="mb-2">✅ Do</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Use semantic color tokens (bg-primary, text-foreground)</li>
                  <li>Use semantic HTML for typography (h1, h2, p)</li>
                  <li>Use Tailwind spacing scale (p-4, mb-6)</li>
                  <li>Use design token classes from this reference</li>
                  <li>Test in both light and dark modes</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2">❌ Don't</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Don't use hardcoded hex colors (#4a7311)</li>
                  <li>Don't use hardcoded RGB values (rgb(110, 165, 50))</li>
                  <li>Don't use text size classes on semantic HTML (text-2xl on h2)</li>
                  <li>Don't use inline styles for spacing (style="padding: 24px")</li>
                  <li>Don't create custom color classes</li>
                </ul>
              </div>

              <div className="bg-background/20 p-4 rounded mt-6">
                <h3 className="mb-2">Example: Compliant Component</h3>
                <pre className="text-sm overflow-x-auto">
{`<div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
  <h2>Section Title</h2>
  <p className="text-muted-foreground mt-2">
    Description text
  </p>
  <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
    Call to Action
  </button>
</div>`}
                </pre>
              </div>
            </div>
          </section>

          {/* Quick Reference */}
          <section className="bg-card p-8 rounded-lg border border-border">
            <h2 className="mb-4">Quick Reference</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="mb-2">Common Patterns</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Card</span>
                    <button
                      onClick={() => copyToClipboard('bg-card text-card-foreground p-6 rounded-lg border border-border')}
                      className="hover:text-primary"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Button Primary</span>
                    <button
                      onClick={() => copyToClipboard('bg-primary text-primary-foreground px-6 py-3 rounded-lg')}
                      className="hover:text-primary"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Section</span>
                    <button
                      onClick={() => copyToClipboard('bg-background text-foreground py-section-md')}
                      className="hover:text-primary"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2">Accessibility</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Focus Ring</span>
                    <button
                      onClick={() => copyToClipboard('focus-visible:ring-2 focus-visible:ring-ring')}
                      className="hover:text-primary"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Touch Target (44px)</span>
                    <button
                      onClick={() => copyToClipboard('min-h-[44px] min-w-[44px]')}
                      className="hover:text-primary"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Screen Reader Only</span>
                    <button
                      onClick={() => copyToClipboard('sr-only')}
                      className="hover:text-primary"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}