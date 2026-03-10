/**
 * Design Blocks Showcase Page
 * 
 * Comprehensive testing and demonstration page for all design block components.
 * Shows all variants, configurations, and real-world usage examples.
 * 
 * **Purpose:**
 * - Test all design blocks (Button, Buttons, Group, Grid, Stack, Row, Columns)
 * - Demonstrate practical patterns (SectionWrapper, CardCollection, etc.)
 * - Verify design system compliance
 * - Provide visual reference for developers
 * 
 * @module DesignBlocksShowcase
 * @category pages
 */

import React from 'react';
import { Container } from '../components/common/Container';
import { DevToolsBreadcrumbs } from '../components/common/DevToolsBreadcrumbs';
import { Button, Buttons, Group, Grid, Stack, Row, Columns, Column } from '../components/blocks/design';
import { SectionWrapper } from '../components/patterns/SectionWrapper';
import { CardCollection } from '../components/patterns/CardCollection';
import { FeatureList } from '../components/patterns/FeatureList';
import { ActionBar } from '../components/patterns/ActionBar';
import { ContentLayout } from '../components/patterns/ContentLayout';
import { 
  Check, 
  Star, 
  Shield, 
  Heart, 
  Lightning as Zap, 
  Medal as Award,
  ArrowRight,
  DownloadSimple as Download,
  MagnifyingGlass as Search,
  Faders as Filter,
  EnvelopeSimple as Mail
} from '@phosphor-icons/react';

/**
 * Design Blocks Showcase page.
 * 
 * Displays all design blocks and patterns with multiple examples
 * and configurations for testing and reference.
 * 
 * @component
 * @category pages
 * @returns {JSX.Element} Rendered showcase page
 */
export default function DesignBlocksShowcase() {
  // Mock data for demonstrations
  const mockCards = [
    { id: 1, title: 'Card 1', description: 'Description for card 1' },
    { id: 2, title: 'Card 2', description: 'Description for card 2' },
    { id: 3, title: 'Card 3', description: 'Description for card 3' },
    { id: 4, title: 'Card 4', description: 'Description for card 4' },
    { id: 5, title: 'Card 5', description: 'Description for card 5' },
    { id: 6, title: 'Card 6', description: 'Description for card 6' },
  ];

  const mockFeatures = [
    {
      icon: Check,
      title: '24/7 Customer Support',
      description: 'Our dedicated team is available around the clock to assist with any questions or concerns.',
    },
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your data is protected with industry-standard encryption and secure payment processing.',
    },
    {
      icon: Star,
      title: 'Best Price Guarantee',
      description: 'We guarantee the lowest prices on all tours. Find it cheaper elsewhere and we\'ll match it.',
    },
    {
      icon: Heart,
      title: 'Flexible Cancellation',
      description: 'Cancel up to 48 hours before departure for a full refund, no questions asked.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DevToolsBreadcrumbs currentPage="Design Blocks Showcase" />
      {/* Breadcrumbs */}
      <div className="bg-background py-6">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Developer Tools', href: '/dev-tools' },
              { label: 'Design Blocks Showcase', isCurrent: true }
            ]}
          />
        </Container>
      </div>
      
      {/* Page Header */}
      <SectionWrapper variant="primary" spacing="large">
        <Stack gap="6" align="center">
          <h1 className="text-center">
            Design Blocks Showcase
          </h1>
          <p className="text-center max-w-2xl font-sans text-xl">
            Complete demonstration of all WordPress design blocks and practical patterns.
            Built with CSS variables, Tailwind utilities, and full design system compliance.
          </p>
        </Stack>
      </SectionWrapper>

      {/* Button Blocks */}
      <SectionWrapper variant="default" spacing="large" id="buttons">
        <Stack gap="8">
          <div>
            <h2 className="mb-2">
              Button Blocks
            </h2>
            <p className="text-muted-foreground font-sans text-lg">
              core/button + core/buttons
            </p>
          </div>

          {/* Button Variants */}
          <div>
            <h3 className="mb-4">Button Variants</h3>
            <Buttons gap="4" align="start">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </Buttons>
          </div>

          {/* Button Sizes */}
          <div>
            <h3 className="mb-4">Button Sizes</h3>
            <Buttons gap="4" align="start">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="default">Default</Button>
              <Button variant="primary" size="lg">Large</Button>
            </Buttons>
          </div>

          {/* Buttons with Icons */}
          <div>
            <h3 className="mb-4">Buttons with Icons</h3>
            <Buttons gap="4" align="start">
              <Button variant="primary" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                Continue
              </Button>
              <Button variant="outline" icon={<Download className="h-4 w-4" />}>
                Download
              </Button>
              <Button variant="secondary" icon={<Mail className="h-4 w-4" />}>
                Contact
              </Button>
            </Buttons>
          </div>

          {/* Responsive Button Group */}
          <div>
            <h3 className="mb-4">Responsive Button Group (stacks on mobile)</h3>
            <Buttons stackOnMobile gap="4" align="center">
              <Button variant="primary" size="lg">Get Started</Button>
              <Button variant="outline" size="lg">Learn More</Button>
              <Button variant="ghost" size="lg">View Demo</Button>
            </Buttons>
          </div>
        </Stack>
      </SectionWrapper>

      {/* Grid Block */}
      <SectionWrapper variant="muted" spacing="large" id="grid">
        <Stack gap="8">
          <div>
            <h2 className="mb-2">Grid Block</h2>
            <p className="text-muted-foreground">core/grid</p>
          </div>

          {/* Fixed 3-column grid */}
          <div>
            <h3 className="mb-4">Fixed 3-Column Grid</h3>
            <Grid columns={3} gap="6">
              {mockCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-card p-6 rounded-lg border border-border"
                >
                  <h4 className="mb-2">{card.title}</h4>
                  <p className="text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </Grid>
          </div>

          {/* Responsive grid */}
          <div>
            <h3 className="mb-4">Responsive Grid (1/2/3 columns)</h3>
            <Grid responsive={{ mobile: 1, tablet: 2, desktop: 3 }} gap="6">
              {mockCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-background p-6 rounded-lg border border-border"
                >
                  <h4 className="mb-2">{card.title}</h4>
                  <p className="text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </Grid>
          </div>
        </Stack>
      </SectionWrapper>

      {/* Stack Block */}
      <SectionWrapper variant="default" spacing="large" id="stack">
        <Stack gap="8">
          <div>
            <h2 className="mb-2">Stack Block</h2>
            <p className="text-muted-foreground">core/stack</p>
          </div>

          <div>
            <h3 className="mb-4">Vertical Stack with Cards</h3>
            <Stack gap="4" className="max-w-2xl">
              {mockCards.slice(0, 3).map((card) => (
                <div
                  key={card.id}
                  className="bg-card p-6 rounded-lg border border-border"
                >
                  <h4 className="mb-2">{card.title}</h4>
                  <p className="text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </Stack>
          </div>
        </Stack>
      </SectionWrapper>

      {/* Row Block */}
      <SectionWrapper variant="muted" spacing="large" id="row">
        <Stack gap="8">
          <div>
            <h2 className="mb-2">Row Block</h2>
            <p className="text-muted-foreground">core/row</p>
          </div>

          {/* Horizontal row with justify */}
          <div>
            <h3 className="mb-4">Row with Space Between</h3>
            <Row gap="0" justify="between" align="center" className="bg-card p-4 rounded-lg border">
              <div>
                <h4>Title</h4>
                <p className="text-muted-foreground">Subtitle</p>
              </div>
              <Buttons gap="3">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Confirm</Button>
              </Buttons>
            </Row>
          </div>

          {/* Centered row */}
          <div>
            <h3 className="mb-4">Centered Row</h3>
            <Row gap="4" justify="center" align="center">
              <Button variant="primary">Action 1</Button>
              <Button variant="secondary">Action 2</Button>
              <Button variant="outline">Action 3</Button>
            </Row>
          </div>
        </Stack>
      </SectionWrapper>

      {/* Columns Block */}
      <SectionWrapper variant="default" spacing="large" id="columns">
        <Stack gap="8">
          <div>
            <h2 className="mb-2">Columns Block</h2>
            <p className="text-muted-foreground">core/columns + core/column</p>
          </div>

          {/* Two equal columns */}
          <div>
            <h3 className="mb-4">Two Equal Columns</h3>
            <Columns columns={2} gap="6">
              <Column>
                <div className="bg-card p-6 rounded-lg border">
                  <h4 className="mb-2">Left Column</h4>
                  <p className="text-muted-foreground">
                    Equal width column with card styling and content.
                  </p>
                </div>
              </Column>
              <Column>
                <div className="bg-card p-6 rounded-lg border">
                  <h4 className="mb-2">Right Column</h4>
                  <p className="text-muted-foreground">
                    Equal width column with card styling and content.
                  </p>
                </div>
              </Column>
            </Columns>
          </div>

          {/* Three columns */}
          <div>
            <h3 className="mb-4">Three Columns</h3>
            <Columns columns={3} gap="6">
              <Column>
                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="mb-2">Column 1</h4>
                  <p>Content...</p>
                </div>
              </Column>
              <Column>
                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="mb-2">Column 2</h4>
                  <p>Content...</p>
                </div>
              </Column>
              <Column>
                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="mb-2">Column 3</h4>
                  <p>Content...</p>
                </div>
              </Column>
            </Columns>
          </div>
        </Stack>
      </SectionWrapper>

      {/* Practical Patterns */}
      <SectionWrapper variant="accent" spacing="xlarge" id="patterns">
        <Stack gap="12">
          <div>
            <h2 className="mb-2">Practical Patterns</h2>
            <p>Real-world components built with design blocks</p>
          </div>

          {/* CardCollection Pattern */}
          <div>
            <h3 className="mb-6">CardCollection Pattern</h3>
            <CardCollection
              items={mockCards}
              columns={{ mobile: 1, tablet: 2, desktop: 3 }}
              gap="6"
              renderCard={(card) => (
                <div className="bg-background p-6 rounded-lg border">
                  <h4 className="mb-2">{card.title}</h4>
                  <p className="text-muted-foreground">{card.description}</p>
                </div>
              )}
            />
          </div>

          {/* FeatureList Pattern */}
          <div>
            <h3 className="mb-6">FeatureList Pattern</h3>
            <FeatureList
              features={mockFeatures}
              gap="6"
              iconSize="md"
              iconColor="primary"
            />
          </div>

          {/* ActionBar Pattern */}
          <div>
            <h3 className="mb-6">ActionBar Pattern</h3>
            <ActionBar
              leftContent={
                <h4 className="font-serif">
                  Results (24)
                </h4>
              }
              rightContent={
                <Row gap="3">
                  <Button variant="outline" size="sm" icon={<Filter className="h-4 w-4" />}>
                    Filters
                  </Button>
                  <Button variant="outline" size="sm" icon={<Search className="h-4 w-4" />}>
                    Search
                  </Button>
                </Row>
              }
              variant="bordered"
            />
          </div>

          {/* ContentLayout Pattern */}
          <div>
            <h3 className="mb-6">ContentLayout Pattern (Sidebar Right)</h3>
            <ContentLayout
              layout="sidebar-right"
              main={
                <div className="bg-background p-8 rounded-lg border">
                  <h4 className="mb-4">Main Content Area</h4>
                  <p className="text-muted-foreground mb-4">
                    This is the main content area (66.667% width) with a right sidebar.
                    Content automatically stacks on mobile for better readability.
                  </p>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              }
              sidebar={
                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="mb-4">Sidebar</h4>
                  <Stack gap="3">
                    <div className="p-3 bg-background rounded">Widget 1</div>
                    <div className="p-3 bg-background rounded">Widget 2</div>
                    <div className="p-3 bg-background rounded">Widget 3</div>
                  </Stack>
                </div>
              }
              gap="8"
            />
          </div>
        </Stack>
      </SectionWrapper>

      {/* Design System Compliance */}
      <SectionWrapper variant="default" spacing="large">
        <Stack gap="6" align="center">
          <div className="text-center">
            <h2 className="mb-4">Design System Compliance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All components use CSS variables from the design system, ensuring consistent
              styling and easy customization. Font faces (Lora for headings, Noto Sans for body),
              colors, spacing, and borders all reference design tokens.
            </p>
          </div>
          
          <Row gap="4" justify="center">
            <div className="px-6 py-3 bg-primary text-primary-foreground rounded-lg">
              ✓ CSS Variables
            </div>
            <div className="px-6 py-3 bg-primary text-primary-foreground rounded-lg">
              ✓ Design Tokens
            </div>
            <div className="px-6 py-3 bg-primary text-primary-foreground rounded-lg">
              ✓ WCAG AA
            </div>
            <div className="px-6 py-3 bg-primary text-primary-foreground rounded-lg">
              ✓ WordPress Aligned
            </div>
          </Row>
        </Stack>
      </SectionWrapper>
    </div>
  );
}