/**
 * Theme Blocks Index
 * 
 * Central export point for all WordPress theme block components.
 * 
 * **Theme Blocks:**
 * - Navigation: Menu navigation with mobile support
 * - Search: Search form for site content
 * - SiteLogo: Site logo with dark mode support
 * - SiteTitle: Site name with heading hierarchy
 * - SiteTagline: Site description/slogan
 * 
 * **Usage:**
 * ```tsx
 * import { Navigation, Search, SiteLogo, SiteTitle, SiteTagline } from '../blocks/theme';
 * ```
 * 
 * @module theme
 * @category blocks
 */

export { Navigation } from './Navigation';
export type { MenuItem } from './Navigation';

export { Search } from './Search';

export { SiteLogo } from './SiteLogo';

export { SiteTitle } from './SiteTitle';

export { SiteTagline } from './SiteTagline';
