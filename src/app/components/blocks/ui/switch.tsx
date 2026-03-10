"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "../../../lib/ui-utils";

/**
 * Switch Component - WordPress UI Block Component
 * 
 * Uses WordPress BEM CSS classes (NO dark: Tailwind classes)
 * All styling via /src/styles/blocks/ui-components.css
 * Uses CSS variables from WordPress theme.json
 * 
 * @see /src/styles/blocks/ui-components.css
 */
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "wp-ui-switch",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="wp-ui-switch__thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
