import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../../lib/ui-utils";

/**
 * Badge Component - WordPress UI Block Component
 * 
 * Uses WordPress BEM CSS classes (NO dark: Tailwind classes)
 * All styling via /src/styles/blocks/ui-components.css
 * Uses CSS variables from WordPress theme.json
 * 
 * @see /src/styles/blocks/ui-components.css
 */
const badgeVariants = cva(
  "wp-ui-badge",
  {
    variants: {
      variant: {
        default: "wp-ui-badge--default",
        secondary: "wp-ui-badge--secondary",
        destructive: "wp-ui-badge--destructive",
        outline: "wp-ui-badge--outline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
