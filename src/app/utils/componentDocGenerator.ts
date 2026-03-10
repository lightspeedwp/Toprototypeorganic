/**
 * Component Documentation Generator
 * 
 * Automatically generates comprehensive documentation for React components.
 * Extracts props, usage examples, and generates markdown documentation.
 * 
 * @module componentDocGenerator
 * @category utils
 */

/**
 * Component documentation structure.
 */
export interface ComponentDocumentation {
  componentName: string;
  description: string;
  category: 'pattern' | 'common' | 'part' | 'block';
  filePath: string;
  props: PropDocumentation[];
  examples: UsageExample[];
  dependencies: string[];
  relatedComponents: string[];
  accessibility: AccessibilityInfo;
  designTokens: string[];
  bestPractices: string[];
  version: string;
  lastUpdated: string;
  markdown: string;
}

/**
 * Prop documentation.
 */
export interface PropDocumentation {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
  example?: string;
}

/**
 * Usage example.
 */
export interface UsageExample {
  title: string;
  code: string;
  description?: string;
}

/**
 * Accessibility information.
 */
export interface AccessibilityInfo {
  ariaAttributes: string[];
  keyboardSupport: string[];
  focusManagement: string;
  screenReaderNotes: string[];
}

/**
 * Extract component name from code.
 */
function extractComponentName(code: string, fileName: string): string {
  // Try function component
  const funcMatch = code.match(/export\s+(?:default\s+)?function\s+(\w+)/);
  if (funcMatch) return funcMatch[1];
  
  // Try arrow function
  const arrowMatch = code.match(/export\s+const\s+(\w+)\s*=.*?(?:React\.FC|React\.FunctionComponent)/);
  if (arrowMatch) return arrowMatch[1];
  
  // Try default export
  const defaultMatch = code.match(/export\s+default\s+(\w+)/);
  if (defaultMatch) return defaultMatch[1];
  
  // Fallback to filename
  return fileName.replace(/\.(tsx|ts|jsx|js)$/, '');
}

/**
 * Extract JSDoc description from code.
 */
function extractDescription(code: string, componentName: string): string {
  // Look for JSDoc comment before component
  const jsdocPattern = new RegExp(
    `/\\*\\*([^*]|\\*(?!/))*\\*/\\s*export\\s+(?:default\\s+)?(?:function|const)\\s+${componentName}`,
    's'
  );
  
  const match = code.match(jsdocPattern);
  if (match) {
    const jsdoc = match[0];
    // Extract description lines (not @tags)
    const lines = jsdoc
      .split('\n')
      .map(line => line.replace(/^\s*\*\s?/, ''))
      .filter(line => !line.startsWith('@') && !line.startsWith('/**') && !line.startsWith('*/'))
      .map(line => line.trim())
      .filter(Boolean);
    
    return lines.join(' ');
  }
  
  return 'No description available.';
}

/**
 * Extract props from TypeScript interface or type.
 */
function extractProps(code: string, componentName: string): PropDocumentation[] {
  const props: PropDocumentation[] = [];
  
  // Look for Props interface/type
  const interfacePattern = new RegExp(
    `interface\\s+${componentName}Props\\s*{([^}]+)}`,
    's'
  );
  const typePattern = new RegExp(
    `type\\s+${componentName}Props\\s*=\\s*{([^}]+)}`,
    's'
  );
  
  const interfaceMatch = code.match(interfacePattern);
  const typeMatch = code.match(typePattern);
  const propsBlock = interfaceMatch?.[1] || typeMatch?.[1];
  
  if (!propsBlock) return props;
  
  // Parse each prop
  const propLines = propsBlock.split('\n').filter(line => {
    const trimmed = line.trim();
    return trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*');
  });
  
  propLines.forEach(line => {
    // Extract prop info: name: type;
    const propMatch = line.match(/(\w+)\??\s*:\s*([^;]+)/);
    if (!propMatch) return;
    
    const [, name, type] = propMatch;
    const required = !line.includes('?:');
    
    // Look for JSDoc comment above prop
    const propIndex = propsBlock.indexOf(line);
    const beforeProp = propsBlock.substring(0, propIndex);
    const commentMatch = beforeProp.match(/\/\*\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/\s*$/);
    
    let description = '';
    if (commentMatch) {
      const comment = commentMatch[0];
      description = comment
        .split('\n')
        .map(l => l.replace(/^\s*\*\s?/, ''))
        .filter(l => !l.startsWith('/**') && !l.startsWith('*/') && !l.startsWith('@'))
        .map(l => l.trim())
        .filter(Boolean)
        .join(' ');
    }
    
    props.push({
      name,
      type: type.trim(),
      required,
      description: description || 'No description available.',
    });
  });
  
  return props;
}

/**
 * Generate usage examples.
 */
function generateExamples(
  componentName: string,
  props: PropDocumentation[],
  category: string
): UsageExample[] {
  const examples: UsageExample[] = [];
  
  // Basic example
  const basicProps = props
    .filter(p => p.required)
    .map(p => {
      if (p.type.includes('string')) return `${p.name}="Example"`;
      if (p.type.includes('number')) return `${p.name}={42}`;
      if (p.type.includes('boolean')) return `${p.name}={true}`;
      return `${p.name}={/* value */}`;
    })
    .join(' ');
  
  examples.push({
    title: 'Basic Usage',
    code: `import { ${componentName} } from "../components/${category}/${componentName}";\n\nfunction MyPage() {\n  return (\n    <${componentName} ${basicProps}>\n      Content\n    </${componentName}>\n  );\n}`,
    description: 'Simple usage with required props.',
  });
  
  // Advanced example with all props
  if (props.length > 2) {
    const allProps = props
      .map(p => {
        if (p.type.includes('string')) return `  ${p.name}="Example"`;
        if (p.type.includes('number')) return `  ${p.name}={42}`;
        if (p.type.includes('boolean')) return `  ${p.name}={true}`;
        if (p.type.includes('ReactNode')) return `  ${p.name}={<div>Content</div>}`;
        return `  ${p.name}={/* value */}`;
      })
      .join('\n');
    
    examples.push({
      title: 'Advanced Usage',
      code: `<${componentName}\n${allProps}\n>\n  Content\n</${componentName}>`,
      description: 'Usage with all available props.',
    });
  }
  
  return examples;
}

/**
 * Extract dependencies (imports).
 */
function extractDependencies(code: string): string[] {
  const dependencies: string[] = [];
  
  // Match import statements
  const importPattern = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importPattern.exec(code)) !== null) {
    const importPath = match[1];
    // Only include relative imports (our components)
    if (importPath.startsWith('.')) {
      // Extract component name from path
      const componentMatch = importPath.match(/\/(\w+)$/);
      if (componentMatch) {
        dependencies.push(componentMatch[1]);
      }
    }
  }
  
  return [...new Set(dependencies)];
}

/**
 * Extract design tokens used.
 */
function extractDesignTokens(code: string): string[] {
  const tokens: string[] = [];
  
  // Common semantic tokens
  const tokenPatterns = [
    /bg-background/g,
    /bg-foreground/g,
    /bg-card/g,
    /bg-primary/g,
    /bg-secondary/g,
    /bg-muted/g,
    /bg-accent/g,
    /bg-destructive/g,
    /text-foreground/g,
    /text-primary/g,
    /text-secondary/g,
    /text-muted-foreground/g,
    /text-accent-foreground/g,
    /border-border/g,
    /ring-ring/g,
  ];
  
  tokenPatterns.forEach(pattern => {
    if (pattern.test(code)) {
      const token = pattern.source.replace(/\//g, '');
      if (!tokens.includes(token)) {
        tokens.push(token);
      }
    }
  });
  
  return tokens;
}

/**
 * Extract accessibility information.
 */
function extractAccessibility(code: string): AccessibilityInfo {
  const ariaAttributes: string[] = [];
  const keyboardSupport: string[] = [];
  const screenReaderNotes: string[] = [];
  
  // Extract ARIA attributes
  const ariaPattern = /aria-\w+/g;
  let match;
  while ((match = ariaPattern.exec(code)) !== null) {
    if (!ariaAttributes.includes(match[0])) {
      ariaAttributes.push(match[0]);
    }
  }
  
  // Check for keyboard support
  if (/onKeyDown|onKeyUp|onKeyPress/.test(code)) {
    keyboardSupport.push('Custom keyboard event handlers');
  }
  if (/tabIndex/.test(code)) {
    keyboardSupport.push('Tab order managed');
  }
  
  // Check for focus management
  let focusManagement = 'No explicit focus management';
  if (/focus\(\)|autoFocus/.test(code)) {
    focusManagement = 'Component manages focus programmatically';
  }
  
  // Screen reader notes
  if (ariaAttributes.includes('aria-label')) {
    screenReaderNotes.push('Uses aria-label for accessible names');
  }
  if (ariaAttributes.includes('aria-describedby')) {
    screenReaderNotes.push('Provides additional descriptions via aria-describedby');
  }
  if (/role=/.test(code)) {
    screenReaderNotes.push('Uses ARIA roles for semantic meaning');
  }
  
  return {
    ariaAttributes,
    keyboardSupport,
    focusManagement,
    screenReaderNotes,
  };
}

/**
 * Generate best practices for component.
 */
function generateBestPractices(
  componentName: string,
  props: PropDocumentation[],
  category: string
): string[] {
  const practices: string[] = [];
  
  // Generic best practices
  practices.push('Use semantic HTML elements when possible');
  practices.push('Use design tokens from theme.css for all styling');
  practices.push('Ensure WCAG 2.1 AA accessibility compliance');
  practices.push('Add focus indicators to interactive elements');
  practices.push('Test in both light and dark modes');
  
  // Category-specific
  if (category === 'pattern') {
    practices.push('Follow approved pattern composition rules');
    practices.push('Maintain consistent spacing using fluid tokens');
  } else if (category === 'common') {
    practices.push('Keep component focused and reusable');
    practices.push('Use TypeScript for prop validation');
  }
  
  // Prop-specific
  if (props.some(p => p.name === 'className')) {
    practices.push('Allow className override for flexibility');
  }
  if (props.some(p => p.name === 'children')) {
    practices.push('Support composition via children prop');
  }
  
  return practices;
}

/**
 * Generate markdown documentation.
 */
function generateMarkdown(doc: Omit<ComponentDocumentation, 'markdown'>): string {
  const {
    componentName,
    description,
    category,
    filePath,
    props,
    examples,
    dependencies,
    relatedComponents,
    accessibility,
    designTokens,
    bestPractices,
    version,
    lastUpdated,
  } = doc;
  
  let md = `# ${componentName}\n\n`;
  
  // Metadata
  md += `**Category:** ${category}  \n`;
  md += `**File:** \`${filePath}\`  \n`;
  md += `**Version:** ${version}  \n`;
  md += `**Last Updated:** ${lastUpdated}  \n\n`;
  
  // Description
  md += `## Description\n\n${description}\n\n`;
  
  // Props
  if (props.length > 0) {
    md += `## Props\n\n`;
    md += `| Prop | Type | Required | Default | Description |\n`;
    md += `|------|------|----------|---------|-------------|\n`;
    
    props.forEach(prop => {
      md += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.required ? 'Yes' : 'No'} | ${prop.defaultValue || '-'} | ${prop.description} |\n`;
    });
    
    md += '\n';
  }
  
  // Examples
  if (examples.length > 0) {
    md += `## Usage Examples\n\n`;
    
    examples.forEach((example, index) => {
      md += `### ${example.title}\n\n`;
      if (example.description) {
        md += `${example.description}\n\n`;
      }
      md += `\`\`\`tsx\n${example.code}\n\`\`\`\n\n`;
    });
  }
  
  // Dependencies
  if (dependencies.length > 0) {
    md += `## Dependencies\n\n`;
    md += `This component imports:\n\n`;
    dependencies.forEach(dep => {
      md += `- \`${dep}\`\n`;
    });
    md += '\n';
  }
  
  // Related Components
  if (relatedComponents.length > 0) {
    md += `## Related Components\n\n`;
    relatedComponents.forEach(comp => {
      md += `- [\`${comp}\`](./${comp}.md)\n`;
    });
    md += '\n';
  }
  
  // Accessibility
  md += `## Accessibility\n\n`;
  
  if (accessibility.ariaAttributes.length > 0) {
    md += `**ARIA Attributes:**\n`;
    accessibility.ariaAttributes.forEach(attr => {
      md += `- \`${attr}\`\n`;
    });
    md += '\n';
  }
  
  if (accessibility.keyboardSupport.length > 0) {
    md += `**Keyboard Support:**\n`;
    accessibility.keyboardSupport.forEach(support => {
      md += `- ${support}\n`;
    });
    md += '\n';
  }
  
  md += `**Focus Management:** ${accessibility.focusManagement}\n\n`;
  
  if (accessibility.screenReaderNotes.length > 0) {
    md += `**Screen Reader Notes:**\n`;
    accessibility.screenReaderNotes.forEach(note => {
      md += `- ${note}\n`;
    });
    md += '\n';
  }
  
  // Design Tokens
  if (designTokens.length > 0) {
    md += `## Design Tokens Used\n\n`;
    designTokens.forEach(token => {
      md += `- \`${token}\`\n`;
    });
    md += '\n';
  }
  
  // Best Practices
  if (bestPractices.length > 0) {
    md += `## Best Practices\n\n`;
    bestPractices.forEach(practice => {
      md += `- ${practice}\n`;
    });
    md += '\n';
  }
  
  // Footer
  md += `---\n\n`;
  md += `*Generated automatically by Component Documentation Generator*\n`;
  
  return md;
}

/**
 * Generate complete component documentation.
 * 
 * @param code - Component source code
 * @param fileName - Component file name
 * @param category - Component category
 * @param filePath - Full file path
 * @returns Complete component documentation
 * 
 * @example
 * ```tsx
 * const doc = generateComponentDocumentation(
 *   sourceCode,
 *   'Button.tsx',
 *   'common',
 *   'src/app/components/common/Button.tsx'
 * );
 * 
 * console.log(doc.markdown);
 * ```
 */
export function generateComponentDocumentation(
  code: string,
  fileName: string,
  category: 'pattern' | 'common' | 'part' | 'block',
  filePath: string
): ComponentDocumentation {
  const componentName = extractComponentName(code, fileName);
  const description = extractDescription(code, componentName);
  const props = extractProps(code, componentName);
  const examples = generateExamples(componentName, props, category);
  const dependencies = extractDependencies(code);
  const designTokens = extractDesignTokens(code);
  const accessibility = extractAccessibility(code);
  const bestPractices = generateBestPractices(componentName, props, category);
  
  const doc: Omit<ComponentDocumentation, 'markdown'> = {
    componentName,
    description,
    category,
    filePath,
    props,
    examples,
    dependencies,
    relatedComponents: [], // Would need file system analysis
    accessibility,
    designTokens,
    bestPractices,
    version: '1.0.0',
    lastUpdated: new Date().toISOString().split('T')[0],
  };
  
  const markdown = generateMarkdown(doc);
  
  return {
    ...doc,
    markdown,
  };
}

/**
 * Generate documentation index for multiple components.
 */
export function generateDocumentationIndex(
  docs: ComponentDocumentation[]
): string {
  let md = `# Component Documentation Index\n\n`;
  md += `**Total Components:** ${docs.length}  \n`;
  md += `**Last Updated:** ${new Date().toISOString().split('T')[0]}  \n\n`;
  
  // Group by category
  const byCategory: Record<string, ComponentDocumentation[]> = {
    pattern: [],
    common: [],
    part: [],
    block: [],
  };
  
  docs.forEach(doc => {
    byCategory[doc.category].push(doc);
  });
  
  // Generate index by category
  Object.entries(byCategory).forEach(([category, categoryDocs]) => {
    if (categoryDocs.length === 0) return;
    
    md += `## ${category.charAt(0).toUpperCase() + category.slice(1)} Components\n\n`;
    
    categoryDocs
      .sort((a, b) => a.componentName.localeCompare(b.componentName))
      .forEach(doc => {
        md += `### [${doc.componentName}](${category}/${doc.componentName}.md)\n\n`;
        md += `${doc.description}\n\n`;
        
        if (doc.props.length > 0) {
          md += `**Props:** ${doc.props.length}  \n`;
        }
        if (doc.dependencies.length > 0) {
          md += `**Dependencies:** ${doc.dependencies.join(', ')}  \n`;
        }
        
        md += '\n';
      });
  });
  
  md += `---\n\n`;
  md += `*Generated automatically by Component Documentation Generator*\n`;
  
  return md;
}

/**
 * Export documentation as JSON.
 */
export function exportAsJSON(doc: ComponentDocumentation): string {
  return JSON.stringify(doc, null, 2);
}

/**
 * Create README template for component.
 */
export function generateComponentREADME(doc: ComponentDocumentation): string {
  return doc.markdown;
}
