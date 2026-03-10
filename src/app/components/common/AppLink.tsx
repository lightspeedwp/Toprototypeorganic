/**
 * AppLink — a forwardRef-free replacement for react-router's <Link />.
 *
 * React Router v7's <Link /> is a forwardRef component which renders as a
 * raw `{$$typeof, render}` object inside the Figma Make preview iframe.
 * This wrapper uses useNavigate() so it never exposes a forwardRef boundary
 * to React's reconciler, side-stepping the iframe incompatibility entirely.
 *
 * Drop-in replacement — accepts the same `to` / `className` / `children` API
 * that <Link /> does. Does NOT support `replace`, `state`, or `reloadDocument`
 * since this prototype does not need them.
 *
 * @module AppLink
 * @category common
 */

import { useCallback, type ReactNode, type MouseEvent, type AnchorHTMLAttributes } from "react";
import { useNavigate } from "react-router";

export interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Route path — same as react-router Link's `to` prop */
  to: string;
  children: ReactNode;
}

/**
 * Client-side navigation link that avoids forwardRef.
 *
 * Renders a plain `<a>` and intercepts clicks to use the router
 * programmatically.  External URLs (http/https/mailto) are left
 * as normal links.
 */
export function AppLink({ to, children, onClick, ...rest }: AppLinkProps) {
  const navigate = useNavigate();

  const isExternal = /^(https?:|mailto:|tel:)/.test(to);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // Let the caller's handler run first
      onClick?.(e);

      if (e.defaultPrevented) return;

      // Allow normal browser behaviour for external links or modifier keys
      if (isExternal || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      e.preventDefault();
      navigate(to);
    },
    [to, navigate, onClick, isExternal]
  );

  return (
    <a
      href={to}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}
