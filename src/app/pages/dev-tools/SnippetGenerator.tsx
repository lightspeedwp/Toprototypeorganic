/**
 * Snippet Generator Dashboard
 * 
 * Interactive code snippet generator for rapid development.
 * Generate components, hooks, utilities, and tests with best practices.
 * 
 * @module SnippetGenerator
 * @category dev-tools
 */

import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import { useState } from "react";
import {
  getSnippetTemplates,
  generateSnippet,
  copyToClipboard,
  downloadSnippet,
  getSnippetStats,
  type SnippetTemplate,
  type GeneratedSnippet,
} from "../../utils/snippetGenerator";
import { Code as Code2, Copy, DownloadSimple as Download, CheckCircle as CircleCheck, MagnifyingGlass as Search } from "@phosphor-icons/react";

export default function SnippetGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<SnippetTemplate | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [generatedSnippet, setGeneratedSnippet] = useState<GeneratedSnippet | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allTemplates = getSnippetTemplates();
  const stats = getSnippetStats();

  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template: SnippetTemplate) => {
    setSelectedTemplate(template);
    setGeneratedSnippet(null);
    setCopied(false);
    
    // Initialize values with defaults
    const defaultValues: Record<string, string> = {};
    template.placeholders.forEach(p => {
      defaultValues[p.key] = p.default;
    });
    setValues(defaultValues);
  };

  const handleGenerate = () => {
    if (!selectedTemplate) return;
    
    const snippet = generateSnippet(selectedTemplate.id, values);
    if (snippet) {
      setGeneratedSnippet(snippet);
      setCopied(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedSnippet) return;
    
    const success = await copyToClipboard(generatedSnippet.code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!generatedSnippet) return;
    downloadSnippet(generatedSnippet);
  };

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'component', name: 'Components' },
    { id: 'pattern', name: 'Patterns' },
    { id: 'hook', name: 'Hooks' },
    { id: 'utility', name: 'Utilities' },
    { id: 'page', name: 'Pages' },
    { id: 'test', name: 'Tests' },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <DevToolsBreadcrumbs currentPage="Snippet Generator" />
      {/* Header */}
      <div className="bg-muted border-b border-border py-section-sm">
        <Container>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Code2 className="w-8 h-8 text-primary" />
                <h1>Snippet Generator</h1>
              </div>
              <p className="text-muted-foreground">
                Generate production-ready code snippets with best practices
              </p>
            </div>

            <div className="bg-card px-4 py-2 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground">Templates</div>
              <div className="font-serif text-fluid-2xl">{stats.total}</div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-section-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Template Selection */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border border-border focus:ring-2 focus:ring-ring focus:border-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {cat.name}
                  {cat.id !== 'all' && (
                    <span className="ml-1 opacity-70">
                      ({stats.byCategory[cat.id] || 0})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Template List */}
            <div className="bg-card rounded-lg border border-border">
              <div className="p-4 border-b">
                <h3>Templates ({filteredTemplates.length})</h3>
              </div>
              
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {filteredTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`w-full text-left p-4 hover:bg-muted transition-colors ${
                      selectedTemplate?.id === template.id ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="font-medium mb-1">{template.name}</div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {template.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {template.language}
                      </span>
                    </div>
                  </button>
                ))}
                
                {filteredTemplates.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    No templates found
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Configuration & Preview */}
          <div className="lg:col-span-2 space-y-6">
            {selectedTemplate ? (
              <>
                {/* Configuration */}
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h2 className="mb-4">Configure Template</h2>

                  <div className="space-y-4">
                    {selectedTemplate.placeholders.map(placeholder => (
                      <div key={placeholder.key}>
                        <label className="block text-sm font-medium mb-2">
                          {placeholder.label}
                        </label>
                        
                        {placeholder.type === 'text' && (
                          <input
                            type="text"
                            value={values[placeholder.key] || placeholder.default}
                            onChange={(e) => setValues({ ...values, [placeholder.key]: e.target.value })}
                            className="w-full px-4 py-2 bg-muted rounded-lg border border-border focus:ring-2 focus:ring-ring focus:border-primary"
                          />
                        )}
                        
                        {placeholder.type === 'select' && placeholder.options && (
                          <select
                            value={values[placeholder.key] || placeholder.default}
                            onChange={(e) => setValues({ ...values, [placeholder.key]: e.target.value })}
                            className="w-full px-4 py-2 bg-muted rounded-lg border border-border focus:ring-2 focus:ring-ring focus:border-primary"
                          >
                            {placeholder.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}

                    <button
                      onClick={handleGenerate}
                      className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      Generate Code
                    </button>
                  </div>

                  {/* Dependencies & Imports */}
                  {(selectedTemplate.imports && selectedTemplate.imports.length > 0) && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2 text-sm">Required Imports</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.imports.map(imp => (
                          <span key={imp} className="text-xs px-2 py-1 bg-background rounded">
                            {imp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {(selectedTemplate.dependencies && selectedTemplate.dependencies.length > 0) && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2 text-sm">Dependencies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.dependencies.map(dep => (
                          <span key={dep} className="text-xs px-2 py-1 bg-background rounded font-mono">
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Generated Code */}
                {generatedSnippet && (
                  <div className="bg-card rounded-lg border border-border">
                    <div className="p-4 border-b flex items-center justify-between">
                      <div>
                        <h3>Generated Code</h3>
                        <p className="text-sm text-muted-foreground">
                          {generatedSnippet.filename}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                        >
                          {copied ? (
                            <>
                              <CircleCheck className="w-4 h-4 text-primary" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={handleDownload}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{generatedSnippet.code}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-muted p-12 rounded-lg text-center">
                <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="mb-2">Select a Template</h3>
                <p className="text-muted-foreground">
                  Choose a template from the left to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-accent text-accent-foreground p-6 rounded-lg mt-8">
          <h3 className="mb-4">About Snippet Generator</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">Available Templates</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Functional Components</li>
                <li>Pattern Components</li>
                <li>Custom Hooks</li>
                <li>Utility Functions</li>
                <li>Page Templates</li>
                <li>Test Suites</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>TypeScript support</li>
                <li>JSDoc documentation</li>
                <li>Best practices included</li>
                <li>WordPress mapping</li>
                <li>Copy or download</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Benefits</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>10x faster development</li>
                <li>Consistent code style</li>
                <li>Reduced errors</li>
                <li>Built-in documentation</li>
                <li>Production-ready code</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}