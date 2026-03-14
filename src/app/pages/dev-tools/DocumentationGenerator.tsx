/**
 * Documentation Generator Page
 * 
 * Interactive tool for auto-generating component documentation.
 * Extracts props, usage examples, and creates markdown documentation.
 * 
 * @module DocumentationGenerator
 * @category dev-tools
 */

import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { useState } from "react";
import {
  generateComponentDocumentation,
  type ComponentDocumentation,
} from "../../utils/componentDocGenerator";
import { FileText, Copy, DownloadSimple as Download, Check } from "@phosphor-icons/react";

// Sample component for demo
const SAMPLE_CODE = `import { cn } from "../../lib/utils";

interface ButtonProps {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Optional CSS class */
  className?: string;
  /** Button content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Disable button */
  disabled?: boolean;
}

/**
 * Button component with design system variants.
 * 
 * Provides accessible, styled buttons with multiple variants and sizes.
 * All buttons include focus indicators and proper ARIA attributes.
 * 
 * @component
 * @category common
 */
export function Button({ 
  variant = 'primary',
  size = 'md',
  className,
  children,
  onClick,
  disabled = false
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        "rounded-lg transition-colors",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
}`;

export default function DocumentationGenerator() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [fileName, setFileName] = useState('Button.tsx');
  const [category, setCategory] = useState<'pattern' | 'common' | 'part' | 'block'>('common');
  const [documentation, setDocumentation] = useState<ComponentDocumentation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const generateDocs = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const filePath = `src/app/components/${category}/${fileName}`;
      const doc = generateComponentDocumentation(code, fileName, category, filePath);
      setDocumentation(doc);
      setIsGenerating(false);
    }, 500);
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const downloadMarkdown = () => {
    if (!documentation) return;
    
    const blob = new Blob([documentation.markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentation.componentName}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <DevToolsBreadcrumbs currentPage="Documentation Generator" />
      {/* Header */}
      <div className="bg-muted border-b border-border py-section-sm">
        <Container>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-fluid-sm">
            <div className="flex flex-col gap-element-sm">
              <div className="wp-page-header__icon-container w-14 h-14 flex items-center justify-center rounded-[var(--radius-lg)] bg-primary/10 text-primary transition-colors hover:bg-primary/20">
                <FileText className="w-7 h-7" />
              </div>
              <h1>Documentation Generator</h1>
              <p className="text-muted-foreground">
                Automatically generate comprehensive documentation from component code
              </p>
            </div>

            <button
              onClick={generateDocs}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 w-full md:w-auto md:shrink-0"
            >
              {isGenerating ? 'Generating...' : 'Generate Docs'}
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="flex flex-col gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="pb-4">Component Code</h2>
              
              {/* Configuration */}
              <div className="grid grid-cols-2 gap-4 pb-4">
                <div>
                  <label htmlFor="fileName" className="block text-sm pb-2">
                    File Name
                  </label>
                  <input
                    id="fileName"
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm pb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="common">Common</option>
                    <option value="pattern">Pattern</option>
                    <option value="part">Part</option>
                    <option value="block">Block</option>
                  </select>
                </div>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 px-4 py-3 rounded-lg bg-muted border border-border text-foreground font-mono text-sm focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Paste component code here..."
              />
            </div>

            <div className="bg-accent text-accent-foreground p-4 rounded-lg text-sm">
              <h4 className="font-medium pb-2">Tips for Best Results:</h4>
              <ul className="list-disc list-inside flex flex-col gap-1">
                <li>Include JSDoc comments above component and props</li>
                <li>Define props interface with descriptions</li>
                <li>Use TypeScript for better type extraction</li>
                <li>Include ARIA attributes for accessibility info</li>
                <li>Use design tokens for token extraction</li>
              </ul>
            </div>
          </div>

          {/* Output Section */}
          <div>
            {documentation ? (
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-start justify-between gap-4 pb-4">
                    <div>
                      <h2>{documentation.componentName}</h2>
                      <p className="text-sm text-muted-foreground pt-1">
                        {documentation.category} component
                      </p>
                    </div>

                    <button
                      onClick={downloadMarkdown}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>

                  <p className="text-sm">{documentation.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg border border-border text-center">
                    <div className="font-serif text-fluid-2xl">{documentation.props.length}</div>
                    <div className="text-sm text-muted-foreground">Props</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border text-center">
                    <div className="font-serif text-fluid-2xl">{documentation.examples.length}</div>
                    <div className="text-sm text-muted-foreground">Examples</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border text-center">
                    <div className="font-serif text-fluid-2xl">{documentation.dependencies.length}</div>
                    <div className="text-sm text-muted-foreground">Dependencies</div>
                  </div>
                </div>

                {/* Props Table */}
                {documentation.props.length > 0 && (
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-center justify-between pb-4">
                      <h3>Props</h3>
                      <button
                        onClick={() => {
                          const table = documentation.props
                            .map(p => `${p.name}: ${p.type}${p.required ? ' (required)' : ''}`)
                            .join('\n');
                          copyToClipboard(table, 'props');
                        }}
                        className="flex items-center gap-2 text-sm px-3 py-1.5 rounded bg-muted hover:bg-accent transition-colors"
                      >
                        {copiedSection === 'props' ? (
                          <>
                            <Check className="w-4 h-4 text-primary" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2">Prop</th>
                            <th className="text-left py-2">Type</th>
                            <th className="text-left py-2">Required</th>
                            <th className="text-left py-2">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {documentation.props.map((prop, idx) => (
                            <tr key={idx} className="border-b border-border">
                              <td className="py-2 font-mono text-primary">{prop.name}</td>
                              <td className="py-2 font-mono text-xs">{prop.type}</td>
                              <td className="py-2">
                                {prop.required ? (
                                  <span className="text-destructive">Yes</span>
                                ) : (
                                  <span className="text-muted-foreground">No</span>
                                )}
                              </td>
                              <td className="py-2 text-muted-foreground">{prop.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Examples */}
                {documentation.examples.length > 0 && (
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h3 className="pb-4">Usage Examples</h3>
                    
                    <div className="flex flex-col gap-4">
                      {documentation.examples.map((example, idx) => (
                        <div key={idx} className="bg-muted p-4 rounded-lg">
                          <div className="flex items-center justify-between pb-2">
                            <h4 className="text-sm font-medium">{example.title}</h4>
                            <button
                              onClick={() => copyToClipboard(example.code, `example-${idx}`)}
                              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded bg-background hover:bg-accent transition-colors"
                            >
                              {copiedSection === `example-${idx}` ? (
                                <>
                                  <Check className="w-4 h-4 text-primary" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          
                          {example.description && (
                            <p className="text-sm text-muted-foreground pb-3">
                              {example.description}
                            </p>
                          )}
                          
                          <pre className="bg-background p-3 rounded overflow-x-auto text-xs">
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accessibility */}
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="pb-4">Accessibility</h3>
                  
                  <div className="flex flex-col gap-3 text-sm">
                    {documentation.accessibility.ariaAttributes.length > 0 && (
                      <div>
                        <div className="font-medium pb-1">ARIA Attributes:</div>
                        <div className="flex flex-wrap gap-2">
                          {documentation.accessibility.ariaAttributes.map((attr, idx) => (
                            <code
                              key={idx}
                              className="px-2 py-1 rounded bg-muted text-primary text-xs"
                            >
                              {attr}
                            </code>
                          ))}
                        </div>
                      </div>
                    )}

                    {documentation.accessibility.keyboardSupport.length > 0 && (
                      <div>
                        <div className="font-medium pb-1">Keyboard Support:</div>
                        <ul className="list-disc list-inside text-muted-foreground">
                          {documentation.accessibility.keyboardSupport.map((support, idx) => (
                            <li key={idx}>{support}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <div className="font-medium pb-1">Focus Management:</div>
                      <p className="text-muted-foreground">
                        {documentation.accessibility.focusManagement}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Markdown */}
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center justify-between pb-4">
                    <h3>Generated Markdown</h3>
                    <button
                      onClick={() => copyToClipboard(documentation.markdown, 'markdown')}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      {copiedSection === 'markdown' ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy All
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="bg-muted p-4 rounded overflow-x-auto text-xs max-h-96">
                    <code>{documentation.markdown}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <div className="bg-muted p-12 rounded-lg text-center h-full flex flex-col items-center justify-center">
                <FileText className="w-12 h-12 text-muted-foreground pb-4" />
                <h3 className="pb-2">Ready to Generate</h3>
                <p className="text-muted-foreground">
                  Paste your component code on the left and click "Generate Docs" to create comprehensive documentation.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}