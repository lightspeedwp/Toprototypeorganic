/**
 * Developer Tools Breadcrumbs — Thin Wrapper
 *
 * Convenience wrapper around the canonical Breadcrumbs component.
 * Automatically builds: Home → Dev Tools → [Current Page].
 *
 * This exists solely so dev-tool pages can render breadcrumbs with
 * a single prop instead of building the items array each time.
 * ALL styling comes from /src/styles/breadcrumbs.css via Breadcrumbs.
 *
 * @module DevToolsBreadcrumbs
 * @category common
 */

import { Breadcrumbs } from "./Breadcrumbs";
import { Container } from "./Container";

interface DevToolsBreadcrumbsProps {
  /** Current page title (rendered as the last breadcrumb) */
  currentPage: string;
  /** Optional additional CSS classes on the outer bar */
  className?: string;
}

/**
 * Renders a full-width breadcrumb bar: Home → Dev Tools → currentPage.
 *
 * Uses the canonical Breadcrumbs component internally — never duplicates
 * markup or introduces competing styles.
 */
export function DevToolsBreadcrumbs({ currentPage, className }: DevToolsBreadcrumbsProps) {
  return (
    <div className={`breadcrumb-bar ${className || ''}`}>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Dev Tools", href: "/dev-tools" },
            { label: currentPage, isCurrent: true },
          ]}
        />
      </Container>
    </div>
  );
}
