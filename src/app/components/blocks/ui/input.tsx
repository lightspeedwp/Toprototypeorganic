import * as React from "react";

import { cn } from "../../../lib/ui-utils";

/**
 * Input Component - WordPress UI Block Component
 * 
 * Uses WordPress BEM CSS classes (NO dark: Tailwind classes)
 * All styling via /src/styles/blocks/ui-components.css
 * Uses CSS variables from WordPress theme.json
 * 
 * @see /src/styles/blocks/ui-components.css
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "wp-ui-input",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
