/**
 * Theme Blocks Showcase Page
 * 
 * Demonstrates all WordPress theme block components with various configurations.
 * 
 * **Blocks Showcased:**
 * - Navigation (horizontal, vertical, with submenus)
 * - Search (button inside, button outside, icon only)
 * - SiteLogo (default, with dark mode support)
 * - SiteTitle (H1, H2, with/without link)
 * - SiteTagline (with/without link)
 * 
 * **Purpose:**
 * - Visual testing of all theme blocks
 * - Design system compliance verification
 * - Responsive behavior testing
 * - Accessibility testing
 * - Integration examples
 * 
 * @module ThemeBlocksShowcase
 * @category pages
 */

import { Container } from '../components/common/Container';
import { DevToolsBreadcrumbs } from '../components/common/DevToolsBreadcrumbs';
import { Stack } from "../components/blocks/design/Stack";
import { Row } from "../components/blocks/design/Row";
import { Navigation, Search, SiteLogo, SiteTitle, SiteTagline, MenuItem } from "../components/blocks/theme";
import { useState } from "react";

/**
 * Mock navigation menu data
 */
const primaryMenu: MenuItem[] = [
  {
    id: '1',
    title: 'Home',
    url: '/',
    isActive: true,
  },
  {
    id: '2',
    title: 'Tours',
    url: '/tours',
    children: [
      { id: '2-1', title: 'Safari Tours', url: '/tours/safari' },
      { id: '2-2', title: 'Adventure Tours', url: '/tours/adventure' },
      { id: '2-3', title: 'Cultural Tours', url: '/tours/cultural' },
    ],
  },
  {
    id: '3',
    title: 'Destinations',
    url: '/destinations',
    children: [
      { id: '3-1', title: 'Kenya', url: '/destinations/kenya' },
      { id: '3-2', title: 'Tanzania', url: '/destinations/tanzania' },
      { id: '3-3', title: 'South Africa', url: '/destinations/south-africa' },
    ],
  },
  {
    id: '4',
    title: 'About',
    url: '/about',
  },
  {
    id: '5',
    title: 'Contact',
    url: '/contact',
  },
];

/**
 * Theme Blocks Showcase Page Component
 */
export default function ThemeBlocksShowcase() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  return (
    <div className="min-h-screen bg-background">
      <DevToolsBreadcrumbs currentPage="Theme Blocks Showcase" />
      
      {/* Page Header */}
      <section className="py-section-sm bg-muted border-b border-border">
        <Container>
          <Stack gap="4">
            <h1 className="mb-0">Theme Blocks Showcase</h1>
            <p className="text-muted-foreground text-lg mb-0">
              WordPress theme block components with design system compliance
            </p>
          </Stack>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-section-sm">
        <Stack gap="16">
          {/* Navigation Block */}
          <section>
            <Stack gap="8">
              <div>
                <h2 className="mb-2">Navigation Block</h2>
                <p className="text-muted-foreground mb-0">
                  Menu navigation with horizontal/vertical layouts and mobile support
                </p>
              </div>

              {/* Horizontal Navigation */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Horizontal (Desktop)</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <Navigation 
                    menu={primaryMenu}
                    orientation="horizontal"
                    spacing="6"
                    align="start"
                  />
                </div>
              </div>

              {/* Centered Navigation */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Centered</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <Navigation 
                    menu={primaryMenu}
                    orientation="horizontal"
                    spacing="8"
                    align="center"
                  />
                </div>
              </div>

              {/* Vertical Navigation */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Vertical (Sidebar)</h3>
                <div className="p-6 bg-card border border-border rounded-lg max-w-xs">
                  <Navigation 
                    menu={primaryMenu}
                    orientation="vertical"
                    spacing="4"
                    align="start"
                  />
                </div>
              </div>
            </Stack>
          </section>

          {/* Search Block */}
          <section>
            <Stack gap="8">
              <div>
                <h2 className="mb-2">Search Block</h2>
                <p className="text-muted-foreground mb-0">
                  Search form with button inside/outside and icon/text variations
                </p>
              </div>

              {/* Button Outside */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Button Outside (Default)</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <Search 
                    placeholder="Search articles..."
                    buttonLabel="Search"
                    buttonPosition="outside"
                    onSubmit={handleSearch}
                  />
                </div>
              </div>

              {/* Button Inside */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Button Inside (Compact)</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <Search 
                    placeholder="Search tours..."
                    buttonPosition="inside"
                    onSubmit={handleSearch}
                  />
                </div>
              </div>

              {/* Icon Only */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Icon Only</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <Search 
                    placeholder="Search..."
                    buttonLabel=""
                    buttonPosition="inside"
                    showIcon={true}
                    onSubmit={handleSearch}
                  />
                </div>
              </div>

              {/* Centered */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Centered</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <Search 
                    placeholder="Search..."
                    buttonPosition="inside"
                    align="center"
                    onSubmit={handleSearch}
                  />
                </div>
              </div>

              {searchQuery && (
                <div className="p-4 bg-primary/10 border border-primary rounded-lg">
                  <p className="mb-0">
                    <strong>Search Query:</strong> {searchQuery}
                  </p>
                </div>
              )}
            </Stack>
          </section>

          {/* Site Logo Block */}
          <section>
            <Stack gap="8">
              <div>
                <h2 className="mb-2">Site Logo Block</h2>
                <p className="text-muted-foreground mb-0">
                  Site logo with automatic dark mode support
                </p>
              </div>

              {/* Default Size */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Default (150px)</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <SiteLogo 
                    alt="LightSpeed Tours Logo"
                    width="150px"
                  />
                </div>
              </div>

              {/* Small Size */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Small (100px)</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <SiteLogo 
                    alt="LightSpeed Tours Logo"
                    width="100px"
                  />
                </div>
              </div>

              {/* Without Link */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Without Link</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <SiteLogo 
                    alt="LightSpeed Tours Logo"
                    width="150px"
                    enableLink={false}
                  />
                </div>
              </div>
            </Stack>
          </section>

          {/* Site Title Block */}
          <section>
            <Stack gap="8">
              <div>
                <h2 className="mb-2">Site Title Block</h2>
                <p className="text-muted-foreground mb-0">
                  Site name with semantic heading hierarchy
                </p>
              </div>

              {/* H1 (Homepage) */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">H1 (Homepage)</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <SiteTitle tag="h1">LightSpeed Tours</SiteTitle>
                </div>
              </div>

              {/* H2 (Subpages) */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">H2 (Subpages)</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <SiteTitle tag="h2">LightSpeed Tours</SiteTitle>
                </div>
              </div>

              {/* Without Link */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Without Link</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <SiteTitle tag="h1" enableLink={false}>
                    LightSpeed Tours
                  </SiteTitle>
                </div>
              </div>

              {/* Centered */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Centered</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <SiteTitle tag="h1" className="text-center">
                    LightSpeed Tours
                  </SiteTitle>
                </div>
              </div>
            </Stack>
          </section>

          {/* Site Tagline Block */}
          <section>
            <Stack gap="8">
              <div>
                <h2 className="mb-2">Site Tagline Block</h2>
                <p className="text-muted-foreground mb-0">
                  Site description or slogan with muted styling
                </p>
              </div>

              {/* Default */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Default</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <SiteTagline>Unforgettable African Adventures</SiteTagline>
                </div>
              </div>

              {/* Small Text */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Small Text</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <SiteTagline className="text-sm">
                    Expert-guided safari experiences
                  </SiteTagline>
                </div>
              </div>

              {/* Centered */}
              <div className="space-y-4">
                <h3 className="text-xl mb-2">Centered</h3>
                <div className="p-6 bg-card border border-border rounded-lg">
                  <SiteTagline className="text-center">
                    Discover the wild side of Africa
                  </SiteTagline>
                </div>
              </div>
            </Stack>
          </section>

          {/* Integrated Header Example */}
          <section>
            <Stack gap="8">
              <div>
                <h2 className="mb-2">Integrated Header Example</h2>
                <p className="text-muted-foreground mb-0">
                  Complete header composition using all theme blocks
                </p>
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <header className="bg-background border-b border-border">
                  <Container>
                    <Row justify="between" align="center" className="py-4">
                      {/* Logo + Title + Tagline */}
                      <Row align="center" gap="4">
                        <SiteLogo width="40px" />
                        <Stack gap="1">
                          <SiteTitle tag="h2" className="mb-0">
                            LightSpeed Tours
                          </SiteTitle>
                          <SiteTagline className="text-sm hidden sm:block">
                            Unforgettable Adventures
                          </SiteTagline>
                        </Stack>
                      </Row>

                      {/* Navigation */}
                      <Navigation 
                        menu={primaryMenu}
                        orientation="horizontal"
                        spacing="6"
                      />

                      {/* Search */}
                      <Search 
                        placeholder="Search..."
                        buttonPosition="inside"
                        onSubmit={handleSearch}
                        className="hidden lg:flex"
                      />
                    </Row>
                  </Container>
                </header>
              </div>
            </Stack>
          </section>

          {/* Integrated Footer Example */}
          <section>
            <Stack gap="8">
              <div>
                <h2 className="mb-2">Integrated Footer Example</h2>
                <p className="text-muted-foreground mb-0">
                  Complete footer composition using theme blocks
                </p>
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <footer className="bg-muted py-section-sm">
                  <Container>
                    <Stack gap="8">
                      {/* Logo + Tagline */}
                      <Stack gap="2">
                        <SiteLogo width="120px" />
                        <SiteTagline>
                          Unforgettable African Adventures
                        </SiteTagline>
                      </Stack>

                      {/* Navigation */}
                      <Navigation 
                        menu={primaryMenu}
                        orientation="horizontal"
                        spacing="8"
                        align="center"
                      />

                      {/* Copyright */}
                      <div className="text-center pt-8 border-t border-border">
                        <p className="text-muted-foreground text-sm mb-0">
                          © 2024 LightSpeed Tours. All rights reserved.
                        </p>
                      </div>
                    </Stack>
                  </Container>
                </footer>
              </div>
            </Stack>
          </section>
        </Stack>
      </Container>
    </div>
  );
}