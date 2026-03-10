/**
 * Design System Playground
 * 
 * Interactive playground for testing design system components and patterns.
 * Allows developers to experiment with tokens, components, and layouts.
 * 
 * @module DesignSystemPlayground
 * @category dev-tools
 */

import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { useState } from "react";
import { Button } from "../../components/blocks/design/Button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/blocks/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/blocks/ui/tabs";
import { Copy, Check, Eye, Code } from "@phosphor-icons/react";

type ColorPalette = 'background' | 'card' | 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive';
type SpacingSize = '2' | '4' | '6' | '8' | '12' | '16';
type RadiusSize = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export default function DesignSystemPlayground() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  
  // Component state
  const [bgColor, setBgColor] = useState<ColorPalette>('card');
  const [padding, setPadding] = useState<SpacingSize>('6');
  const [radius, setRadius] = useState<RadiusSize>('lg');
  const [buttonVariant, setButtonVariant] = useState<'default' | 'secondary' | 'outline' | 'ghost'>('default');

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Generate component code
  const generateCardCode = () => {
    const bgClasses = {
      background: 'bg-background text-foreground',
      card: 'bg-card text-card-foreground',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      muted: 'bg-muted text-muted-foreground',
      accent: 'bg-accent text-accent-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
    };

    return `<div className="${bgClasses[bgColor]} p-${padding} rounded-${radius} border border-border">
  <h3>Card Title</h3>
  <p className="text-muted-foreground mt-2">
    Card description goes here
  </p>
</div>`;
  };

  const generateButtonCode = () => {
    return `<Button variant="${buttonVariant}">
  Click Me
</Button>`;
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <DevToolsBreadcrumbs currentPage="Design System Playground" />
      {/* Header */}
      <div className="bg-muted border-b border-border py-section-sm">
        <Container>
          <h1>Design System Playground</h1>
          <p className="text-muted-foreground mt-4">
            Experiment with design tokens, components, and patterns in real-time.
            Copy the generated code and use it in your components.
          </p>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-section-sm">
        <Tabs defaultValue="card" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="card">Card Builder</TabsTrigger>
            <TabsTrigger value="button">Button Builder</TabsTrigger>
            <TabsTrigger value="layout">Layout Builder</TabsTrigger>
            <TabsTrigger value="colors">Color Tester</TabsTrigger>
          </TabsList>

          {/* Card Builder */}
          <TabsContent value="card" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="bg-card p-6 rounded-lg border border-border space-y-6">
                <div>
                  <h3 className="mb-4">Card Controls</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2">Background Color</label>
                      <Select value={bgColor} onValueChange={(v) => setBgColor(v as ColorPalette)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="background">Background</SelectItem>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="muted">Muted</SelectItem>
                          <SelectItem value="accent">Accent</SelectItem>
                          <SelectItem value="destructive">Destructive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block mb-2">Padding</label>
                      <Select value={padding} onValueChange={(v) => setPadding(v as SpacingSize)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">p-2 (8px)</SelectItem>
                          <SelectItem value="4">p-4 (16px)</SelectItem>
                          <SelectItem value="6">p-6 (24px)</SelectItem>
                          <SelectItem value="8">p-8 (32px)</SelectItem>
                          <SelectItem value="12">p-12 (48px)</SelectItem>
                          <SelectItem value="16">p-16 (64px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block mb-2">Border Radius</label>
                      <Select value={radius} onValueChange={(v) => setRadius(v as RadiusSize)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="sm">Small (2px)</SelectItem>
                          <SelectItem value="md">Medium (4px)</SelectItem>
                          <SelectItem value="lg">Large (6px)</SelectItem>
                          <SelectItem value="xl">Extra Large (8px)</SelectItem>
                          <SelectItem value="full">Full</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Generated Code */}
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h4>Generated Code</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode(generateCardCode())}
                    >
                      {copiedCode === generateCardCode() ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      Copy
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto border border-border">
                    <code>{generateCardCode()}</code>
                  </pre>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-muted p-6 rounded-lg border border-border">
                <h3 className="mb-4">Preview</h3>
                
                <div className="bg-background/50 p-8 rounded-lg min-h-[400px] flex items-center justify-center">
                  {/* Live Preview */}
                  <div 
                    className={`
                      ${bgColor === 'background' ? 'bg-background text-foreground' : ''}
                      ${bgColor === 'card' ? 'bg-card text-card-foreground' : ''}
                      ${bgColor === 'primary' ? 'bg-primary text-primary-foreground' : ''}
                      ${bgColor === 'secondary' ? 'bg-secondary text-secondary-foreground' : ''}
                      ${bgColor === 'muted' ? 'bg-muted text-muted-foreground' : ''}
                      ${bgColor === 'accent' ? 'bg-accent text-accent-foreground' : ''}
                      ${bgColor === 'destructive' ? 'bg-destructive text-destructive-foreground' : ''}
                      p-${padding}
                      rounded-${radius}
                      border border-border
                      max-w-md
                    `}
                  >
                    <h3>Card Title</h3>
                    <p className={bgColor === 'card' ? 'text-muted-foreground mt-2' : 'mt-2'}>
                      Card description goes here. This is how your card will look with the selected design tokens.
                    </p>
                  </div>
                </div>

                <div className="wp-bg-accent-light mt-4 p-4 rounded text-sm">
                  <strong>💡 Tip:</strong> All styling uses design tokens from theme.css.
                  Colors automatically adapt to light/dark mode!
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Button Builder */}
          <TabsContent value="button" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="bg-card p-6 rounded-lg border border-border space-y-6">
                <div>
                  <h3 className="mb-4">Button Controls</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2">Variant</label>
                      <Select value={buttonVariant} onValueChange={(v) => setButtonVariant(v as typeof buttonVariant)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default (Primary)</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="outline">Outline</SelectItem>
                          <SelectItem value="ghost">Ghost</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Generated Code */}
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h4>Generated Code</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode(generateButtonCode())}
                    >
                      {copiedCode === generateButtonCode() ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      Copy
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto border border-border">
                    <code>{generateButtonCode()}</code>
                  </pre>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="mb-2">All Variants</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="mb-2">All Sizes</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-muted p-6 rounded-lg border border-border">
                <h3 className="mb-4">Preview</h3>
                
                <div className="bg-background/50 p-8 rounded-lg min-h-[400px] flex items-center justify-center">
                  <Button variant={buttonVariant} size="lg">
                    Click Me
                  </Button>
                </div>

                <div className="wp-bg-accent-light mt-4 p-4 rounded text-sm space-y-2">
                  <p><strong>💡 Focus Test:</strong> Tab to the button and press Enter</p>
                  <p><strong>🎨 Theme Test:</strong> Toggle dark mode to see color changes</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Layout Builder */}
          <TabsContent value="layout" className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="mb-4">Common Layout Patterns</h3>
              
              <div className="space-y-8">
                {/* 3-Column Grid */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4>3-Column Grid</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode('<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\n  {/* Grid items */}\n</div>')}
                    >
                      <Copy className="w-4 h-4" />
                      Copy Code
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-muted p-6 rounded-lg border border-border">
                        <h4>Item {i}</h4>
                        <p className="text-muted-foreground text-sm mt-2">
                          Grid item content
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4>Hero Section</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode('<section className="bg-gradient-to-b from-muted/50 to-background py-section-lg">\n  <div className="container">\n    <div className="max-w-3xl mx-auto text-center">\n      <h1>Hero Title</h1>\n      <p className="text-muted-foreground mt-4">Description</p>\n    </div>\n  </div>\n</section>')}
                    >
                      <Copy className="w-4 h-4" />
                      Copy Code
                    </Button>
                  </div>
                  
                  <section className="bg-gradient-to-b from-muted/50 to-background py-section-sm rounded-lg border border-border">
                    <div className="container">
                      <div className="max-w-3xl mx-auto text-center">
                        <h1>Hero Title</h1>
                        <p className="text-muted-foreground mt-4">
                          Hero description text goes here. This section draws attention to your main message.
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                          <Button>Primary Action</Button>
                          <Button variant="outline">Secondary Action</Button>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Card with Image */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4>Card with Image</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode('<div className="bg-card p-6 rounded-lg border border-border">\n  <img src="/image.jpg" alt="Description" className="w-full h-48 object-cover rounded-lg" />\n  <h3 className="mt-4">Card Title</h3>\n  <p className="text-muted-foreground mt-2">Description</p>\n</div>')}
                    >
                      <Copy className="w-4 h-4" />
                      Copy Code
                    </Button>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border border-border max-w-sm">
                    <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Image Placeholder</span>
                    </div>
                    <h3 className="mt-4">Card Title</h3>
                    <p className="text-muted-foreground mt-2">
                      Card description goes here with more details about the content.
                    </p>
                    <Button className="w-full">View Details</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Color Tester */}
          <TabsContent value="colors" className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="mb-4">Color Palette Testing</h3>
              <p className="text-muted-foreground mb-6">
                Test all semantic color combinations. Toggle dark mode to see how colors adapt.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Background */}
                <div className="bg-background text-foreground p-6 rounded-lg border border-border">
                  <h4>Background</h4>
                  <p className="text-muted-foreground mt-2">
                    Default page background with foreground text
                  </p>
                  <code className="text-sm mt-2 block">bg-background text-foreground</code>
                </div>

                {/* Card */}
                <div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
                  <h4>Card</h4>
                  <p className="text-muted-foreground mt-2">
                    Card container background
                  </p>
                  <code className="text-sm mt-2 block">bg-card text-card-foreground</code>
                </div>

                {/* Primary */}
                <div className="bg-primary text-primary-foreground p-6 rounded-lg">
                  <h4>Primary</h4>
                  <p className="mt-2">
                    Primary brand color for CTAs
                  </p>
                  <code className="text-sm mt-2 block">bg-primary text-primary-foreground</code>
                </div>

                {/* Secondary */}
                <div className="bg-secondary text-secondary-foreground p-6 rounded-lg">
                  <h4>Secondary</h4>
                  <p className="mt-2">
                    Secondary actions and elements
                  </p>
                  <code className="text-sm mt-2 block">bg-secondary text-secondary-foreground</code>
                </div>

                {/* Muted */}
                <div className="bg-muted text-muted-foreground p-6 rounded-lg border border-border">
                  <h4>Muted</h4>
                  <p className="mt-2">
                    Subtle backgrounds and secondary text
                  </p>
                  <code className="text-sm mt-2 block">bg-muted text-muted-foreground</code>
                </div>

                {/* Accent */}
                <div className="bg-accent text-accent-foreground p-6 rounded-lg">
                  <h4>Accent</h4>
                  <p className="mt-2">
                    Highlighted sections and callouts
                  </p>
                  <code className="text-sm mt-2 block">bg-accent text-accent-foreground</code>
                </div>

                {/* Destructive */}
                <div className="bg-destructive text-destructive-foreground p-6 rounded-lg">
                  <h4>Destructive</h4>
                  <p className="mt-2">
                    Destructive actions and errors
                  </p>
                  <code className="text-sm mt-2 block">bg-destructive text-destructive-foreground</code>
                </div>
              </div>

              <div className="wp-bg-accent-light mt-8 p-4 rounded">
                <h4 className="mb-2">Accessibility Notes</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>All color combinations meet WCAG AA contrast requirements</li>
                  <li>Most combinations meet WCAG AAA requirements</li>
                  <li>Colors automatically adapt to light/dark mode</li>
                  <li>Use semantic tokens to maintain accessibility</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}