/**
 * Code Snippet Generator
 * 
 * Generates reusable code snippets for common patterns and components.
 * Accelerates development with pre-configured, best-practice code.
 * 
 * @module snippetGenerator
 * @category utils
 */

/**
 * Snippet template.
 */
export interface SnippetTemplate {
  id: string;
  name: string;
  description: string;
  category: 'component' | 'pattern' | 'hook' | 'utility' | 'page' | 'test';
  language: 'typescript' | 'tsx' | 'css' | 'json';
  code: string;
  placeholders: SnippetPlaceholder[];
  imports?: string[];
  dependencies?: string[];
}

/**
 * Snippet placeholder.
 */
export interface SnippetPlaceholder {
  key: string;
  label: string;
  default: string;
  type: 'text' | 'select' | 'boolean';
  options?: string[];
}

/**
 * Generated snippet.
 */
export interface GeneratedSnippet {
  code: string;
  filename: string;
  language: string;
  imports: string[];
  dependencies: string[];
}

/**
 * Component snippet templates.
 */
const COMPONENT_SNIPPETS: SnippetTemplate[] = [
  {
    id: 'functional-component',
    name: 'Functional Component',
    description: 'Basic functional React component with TypeScript',
    category: 'component',
    language: 'tsx',
    placeholders: [
      { key: 'name', label: 'Component Name', default: 'MyComponent', type: 'text' },
      { key: 'description', label: 'Description', default: 'Component description', type: 'text' },
    ],
    imports: ['React'],
    code: `/**
 * {{description}}
 * 
 * @component
 */

interface {{name}}Props {
  /** Component className */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
}

export function {{name}}({ className, children }: {{name}}Props) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}`,
  },
  {
    id: 'pattern-component',
    name: 'Pattern Component',
    description: 'WordPress block pattern component',
    category: 'pattern',
    language: 'tsx',
    placeholders: [
      { key: 'name', label: 'Pattern Name', default: 'MyPattern', type: 'text' },
      { key: 'description', label: 'Description', default: 'Pattern description', type: 'text' },
      { key: 'wordpress', label: 'WordPress Block', default: 'core/group', type: 'text' },
    ],
    imports: ['Container', 'cn'],
    code: `/**
 * {{description}}
 * 
 * **WordPress Mapping:**
 * Equivalent to {{wordpress}} block pattern.
 * 
 * @component
 * @category patterns
 */

import { Container } from "../common/Container";
import { cn } from "../../lib/utils";

interface {{name}}Props {
  /** Custom className */
  className?: string;
  /** Section title */
  title?: string;
  /** Section content */
  children?: React.ReactNode;
}

export function {{name}}({ className, title, children }: {{name}}Props) {
  return (
    <section className={cn("py-12 md:py-16", className)}>
      <Container>
        {title && <h2 className="mb-6">{title}</h2>}
        {children}
      </Container>
    </section>
  );
}`,
  },
];

/**
 * Hook snippet templates.
 */
const HOOK_SNIPPETS: SnippetTemplate[] = [
  {
    id: 'custom-hook',
    name: 'Custom Hook',
    description: 'Custom React hook with TypeScript',
    category: 'hook',
    language: 'typescript',
    placeholders: [
      { key: 'name', label: 'Hook Name', default: 'useCustomHook', type: 'text' },
      { key: 'description', label: 'Description', default: 'Custom hook description', type: 'text' },
    ],
    imports: ['useState', 'useEffect'],
    code: `import { useState, useEffect } from 'react';

/**
 * {{description}}
 * 
 * @returns Hook state and methods
 * 
 * @example
 * \`\`\`tsx
 * const { value, setValue } = {{name}}();
 * \`\`\`
 */
export function {{name}}() {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    // Effect logic here
  }, [value]);

  return {
    value,
    setValue,
  };
}`,
  },
];

/**
 * Utility snippet templates.
 */
const UTILITY_SNIPPETS: SnippetTemplate[] = [
  {
    id: 'utility-function',
    name: 'Utility Function',
    description: 'Reusable utility function with TypeScript',
    category: 'utility',
    language: 'typescript',
    placeholders: [
      { key: 'name', label: 'Function Name', default: 'myUtility', type: 'text' },
      { key: 'description', label: 'Description', default: 'Utility function description', type: 'text' },
    ],
    code: `/**
 * {{description}}
 * 
 * @param input - Input parameter
 * @returns Processed output
 * 
 * @example
 * \`\`\`tsx
 * const result = {{name}}('input');
 * \`\`\`
 */
export function {{name}}(input: string): string {
  // Function logic here
  return input;
}`,
  },
];

/**
 * Test snippet templates.
 */
const TEST_SNIPPETS: SnippetTemplate[] = [
  {
    id: 'component-test',
    name: 'Component Test',
    description: 'Jest + React Testing Library component test',
    category: 'test',
    language: 'tsx',
    placeholders: [
      { key: 'component', label: 'Component Name', default: 'MyComponent', type: 'text' },
    ],
    imports: ['render', 'screen'],
    dependencies: ['@testing-library/react', '@testing-library/jest-dom'],
    code: `import { render, screen } from '@testing-library/react';
import { {{component}} } from './{{component}}';

describe('{{component}}', () => {
  it('renders without crashing', () => {
    render(<{{component}} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('displays children content', () => {
    render(<{{component}}>Test Content</{{component}}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<{{component}} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});`,
  },
];

/**
 * Page template snippets.
 */
const PAGE_SNIPPETS: SnippetTemplate[] = [
  {
    id: 'archive-page',
    name: 'Archive Page Template',
    description: 'WordPress archive page template',
    category: 'page',
    language: 'tsx',
    placeholders: [
      { key: 'type', label: 'Content Type', default: 'Tour', type: 'text' },
      { key: 'plural', label: 'Plural Name', default: 'Tours', type: 'text' },
    ],
    imports: ['Hero', 'CardGrid', 'CTA', 'Container'],
    code: `/**
 * {{plural}} Archive Page
 * 
 * Displays a grid of {{plural}} with filtering and search.
 * 
 * @page
 */

import { Hero } from "../components/patterns/Hero";
import { CardGrid } from "../components/patterns/CardGrid";
import { CTA } from "../components/patterns/CTA";
import { Container } from "../components/common/Container";

export default function {{plural}}Archive() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <Hero
        title="{{plural}}"
        description="Browse our collection of {{plural}}"
        variant="minimal"
      />

      {/* {{plural}} Grid */}
      <section className="py-12 md:py-16">
        <Container>
          <CardGrid
            items={[]}
            columns={3}
            emptyMessage="No {{plural}} found"
          />
        </Container>
      </section>

      {/* CTA Section */}
      <CTA
        title="Ready to Get Started?"
        description="Contact us to learn more"
        primaryAction={{
          label: "Contact Us",
          href: "/contact",
        }}
      />
    </div>
  );
}`,
  },
];

/**
 * All snippet templates.
 */
const ALL_SNIPPETS: SnippetTemplate[] = [
  ...COMPONENT_SNIPPETS,
  ...HOOK_SNIPPETS,
  ...UTILITY_SNIPPETS,
  ...TEST_SNIPPETS,
  ...PAGE_SNIPPETS,
];

/**
 * Generate snippet code from template.
 * 
 * @param templateId - Template ID
 * @param values - Placeholder values
 * @returns Generated snippet
 * 
 * @example
 * ```tsx
 * const snippet = generateSnippet('functional-component', {
 *   name: 'Header',
 *   description: 'Site header component',
 * });
 * 
 * console.log(snippet.code);
 * // Generated component code
 * ```
 */
export function generateSnippet(
  templateId: string,
  values: Record<string, string>
): GeneratedSnippet | null {
  const template = ALL_SNIPPETS.find(t => t.id === templateId);
  
  if (!template) {
    return null;
  }
  
  let code = template.code;
  
  // Replace all placeholders
  template.placeholders.forEach(placeholder => {
    const value = values[placeholder.key] || placeholder.default;
    const regex = new RegExp(`{{${placeholder.key}}}`, 'g');
    code = code.replace(regex, value);
  });
  
  // Determine filename
  const nameValue = values['name'] || values['component'] || values['type'] || 'Generated';
  const extensions: Record<string, string> = {
    tsx: '.tsx',
    typescript: '.ts',
    css: '.css',
    json: '.json',
  };
  const filename = `${nameValue}${extensions[template.language] || '.tsx'}`;
  
  return {
    code,
    filename,
    language: template.language,
    imports: template.imports || [],
    dependencies: template.dependencies || [],
  };
}

/**
 * Get all snippet templates.
 * 
 * @param category - Optional category filter
 * @returns Snippet templates
 * 
 * @example
 * ```tsx
 * const allSnippets = getSnippetTemplates();
 * const componentSnippets = getSnippetTemplates('component');
 * ```
 */
export function getSnippetTemplates(
  category?: SnippetTemplate['category']
): SnippetTemplate[] {
  if (category) {
    return ALL_SNIPPETS.filter(s => s.category === category);
  }
  return ALL_SNIPPETS;
}

/**
 * Get snippet template by ID.
 * 
 * @param templateId - Template ID
 * @returns Snippet template or null
 * 
 * @example
 * ```tsx
 * const template = getSnippetTemplate('functional-component');
 * ```
 */
export function getSnippetTemplate(templateId: string): SnippetTemplate | null {
  return ALL_SNIPPETS.find(t => t.id === templateId) || null;
}

/**
 * Copy snippet to clipboard.
 * 
 * @param code - Code to copy
 * @returns Success status
 * 
 * @example
 * ```tsx
 * const snippet = generateSnippet('functional-component', { name: 'Header' });
 * const success = await copyToClipboard(snippet.code);
 * ```
 */
export async function copyToClipboard(code: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(code);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Download snippet as file.
 * 
 * @param snippet - Generated snippet
 * 
 * @example
 * ```tsx
 * const snippet = generateSnippet('functional-component', { name: 'Header' });
 * downloadSnippet(snippet);
 * ```
 */
export function downloadSnippet(snippet: GeneratedSnippet): void {
  const blob = new Blob([snippet.code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = snippet.filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Generate multiple snippets from pattern.
 * 
 * @param pattern - Pattern configuration
 * @returns Generated snippets
 * 
 * @example
 * ```tsx
 * const snippets = generatePattern({
 *   name: 'UserProfile',
 *   includeComponent: true,
 *   includeTest: true,
 *   includeHook: true,
 * });
 * ```
 */
export function generatePattern(config: {
  name: string;
  includeComponent?: boolean;
  includeTest?: boolean;
  includeHook?: boolean;
  includeStyles?: boolean;
}): GeneratedSnippet[] {
  const snippets: GeneratedSnippet[] = [];
  
  if (config.includeComponent) {
    const component = generateSnippet('functional-component', {
      name: config.name,
      description: `${config.name} component`,
    });
    if (component) snippets.push(component);
  }
  
  if (config.includeTest) {
    const test = generateSnippet('component-test', {
      component: config.name,
    });
    if (test) snippets.push(test);
  }
  
  if (config.includeHook) {
    const hook = generateSnippet('custom-hook', {
      name: `use${config.name}`,
      description: `Custom hook for ${config.name}`,
    });
    if (hook) snippets.push(hook);
  }
  
  return snippets;
}

/**
 * Search snippets by keyword.
 * 
 * @param keyword - Search keyword
 * @returns Matching snippet templates
 * 
 * @example
 * ```tsx
 * const results = searchSnippets('component');
 * ```
 */
export function searchSnippets(keyword: string): SnippetTemplate[] {
  const lowerKeyword = keyword.toLowerCase();
  
  return ALL_SNIPPETS.filter(snippet => 
    snippet.name.toLowerCase().includes(lowerKeyword) ||
    snippet.description.toLowerCase().includes(lowerKeyword) ||
    snippet.category.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * Get snippet statistics.
 * 
 * @returns Snippet statistics
 * 
 * @example
 * ```tsx
 * const stats = getSnippetStats();
 * console.log(`Total snippets: ${stats.total}`);
 * ```
 */
export function getSnippetStats() {
  const byCategory = ALL_SNIPPETS.reduce((acc, snippet) => {
    acc[snippet.category] = (acc[snippet.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byLanguage = ALL_SNIPPETS.reduce((acc, snippet) => {
    acc[snippet.language] = (acc[snippet.language] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: ALL_SNIPPETS.length,
    byCategory,
    byLanguage,
  };
}
