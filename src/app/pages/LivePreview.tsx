/**
 * Live Preview - Developer Tool
 * 
 * Interactive component preview and testing tool.
 * Allows real-time testing of components with editable props.
 * 
 * **Purpose:**
 * - Live component testing
 * - Interactive prop editing
 * - Visual debugging
 * - Component exploration
 * 
 * **Features:**
 * - Real-time prop updates
 * - Code generation
 * - Copy JSX code
 * - Responsive preview
 * - Dark mode testing
 * 
 * @module LivePreview
 * @category pages
 * @development-tool
 */

import { useState } from 'react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DevToolsBreadcrumbs } from '../components/common/DevToolsBreadcrumbs';
import { Button } from '../components/blocks/design/Button';
import { Input } from '../components/blocks/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/blocks/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/blocks/ui/tabs';
import { Copy, Check, Eye, Code, DeviceMobile as Smartphone, Monitor } from '@phosphor-icons/react';

interface PreviewComponent {
  id: string;
  name: string;
  category: 'Pattern' | 'Block' | 'Common';
  description: string;
}

const COMPONENTS: PreviewComponent[] = [
  { id: 'button', name: 'Button', category: 'Block', description: 'WordPress Button block' },
  { id: 'hero', name: 'Hero', category: 'Pattern', description: 'Hero section pattern' },
  { id: 'card-grid', name: 'CardGrid', category: 'Pattern', description: 'Card grid pattern' },
  { id: 'cta', name: 'CTA', category: 'Pattern', description: 'Call-to-action pattern' },
  { id: 'container', name: 'Container', category: 'Common', description: 'Container wrapper' },
];

export default function LivePreview() {
  const [selectedComponent, setSelectedComponent] = useState<string>('button');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedCode, setCopiedCode] = useState(false);

  // Button props state
  const [buttonText, setButtonText] = useState('Click Me');
  const [buttonVariant, setButtonVariant] = useState<'default' | 'outline' | 'ghost'>('default');
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>('md');

  const handleCopyCode = () => {
    const code = generateCode();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const generateCode = () => {
    switch (selectedComponent) {
      case 'button':
        return `<Button variant="${buttonVariant}" size="${buttonSize}">
  ${buttonText}
</Button>`;
      default:
        return '// Select a component to preview';
    }
  };

  const renderPreview = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <div className="flex items-center justify-center p-8">
            <Button variant={buttonVariant as any} size={buttonSize as any}>
              {buttonText}
            </Button>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center p-16 text-muted-foreground">
            Select a component to preview
          </div>
        );
    }
  };

  const renderControls = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium">Button Text</label>
              <Input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="Enter button text"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium">Variant</label>
              <div className="flex gap-2">
                {['default', 'outline', 'ghost'].map((variant) => (
                  <Button
                    key={variant}
                    onClick={() => setButtonVariant(variant as any)}
                    variant={buttonVariant === variant ? 'default' : 'outline'}
                    size="sm"
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium">Size</label>
              <div className="flex gap-2">
                {['sm', 'md', 'lg'].map((size) => (
                  <Button
                    key={size}
                    onClick={() => setButtonSize(size as any)}
                    variant={buttonSize === size ? 'default' : 'outline'}
                    size="sm"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <DevToolsBreadcrumbs currentPage="Live Preview" />
      <div className="min-h-screen bg-background py-section-sm">
        <Container>
          {/* Header */}
          <div className="flex flex-col gap-4 pb-8">
            <h1>Live Preview</h1>
            <p className="text-muted-foreground">
              Interactive component preview and testing tool. Edit props in real-time and copy generated code.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Component Selector */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg">Components</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col gap-1">
                  {COMPONENTS.map((component) => (
                    <button
                      key={component.id}
                      onClick={() => setSelectedComponent(component.id)}
                      className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors ${
                        selectedComponent === component.id ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="font-medium text-sm">{component.name}</div>
                      <div className="text-xs text-muted-foreground">{component.category}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preview & Controls */}
            <div className="lg:col-span-9 flex flex-col gap-6">
              {/* Preview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Preview</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => setViewMode('desktop')}
                        variant={viewMode === 'desktop' ? 'default' : 'outline'}
                        size="sm"
                      >
                        <Monitor className="w-4 h-4" />
                        Desktop
                      </Button>
                      <Button
                        onClick={() => setViewMode('mobile')}
                        variant={viewMode === 'mobile' ? 'default' : 'outline'}
                        size="sm"
                      >
                        <Smartphone className="w-4 h-4" />
                        Mobile
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className={viewMode === 'mobile' ? 'flex flex-col items-center' : ''}>
                  <div
                    className={`border border-border rounded-lg bg-background ${
                      viewMode === 'mobile' ? 'max-w-sm w-full' : ''
                    }`}
                  >
                    {renderPreview()}
                  </div>
                </CardContent>
              </Card>

              {/* Tabs: Controls & Code */}
              <Tabs defaultValue="controls">
                <TabsList>
                  <TabsTrigger value="controls">
                    <Eye className="w-4 h-4" />
                    Controls
                  </TabsTrigger>
                  <TabsTrigger value="code">
                    <Code className="w-4 h-4" />
                    Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="controls">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Component Props</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderControls()}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="code">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Generated Code</CardTitle>
                        <Button onClick={handleCopyCode} size="sm">
                          {copiedCode ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy Code
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                        <code className="text-sm">
                          {generateCode()}
                        </code>
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="p-6 border border-border rounded-lg bg-muted flex flex-col gap-2">
            <h2>🚧 Coming Soon</h2>
            <p className="text-muted-foreground">
              This Live Preview tool is currently in development. More components and features will be added soon:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-1 text-sm text-muted-foreground">
              <li>All 27 components available for preview</li>
              <li>Advanced prop editors (colors, spacing, etc.)</li>
              <li>Responsive breakpoint testing</li>
              <li>Dark mode toggle</li>
              <li>Export to CodePen/CodeSandbox</li>
              <li>Component variant comparison</li>
            </ul>
          </div>
        </Container>
      </div>
    </>
  );
}