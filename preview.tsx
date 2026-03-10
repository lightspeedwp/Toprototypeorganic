import type { Preview } from "@storybook/react";
import React from "react";

// Import the single CSS entry point (contains all styles in correct order)
import "../src/styles/index.css";

/**
 * Storybook Preview Configuration
 * 
 * This configuration:
 * 1. Imports the complete design system (CSS variables from theme.css)
 * 2. Supports light/dark mode toggling via toolbar
 * 3. Uses Lora (headings) and Noto Sans (body) fonts
 * 4. Ensures WCAG AA/AAA compliance in both modes
 */

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#0a0a0a",
        },
      ],
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    (Story, context) => {
      // Apply dark mode class based on background selection
      const isDark = context.globals.backgrounds?.value === "#0a0a0a";
      
      React.useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }, [isDark]);

      return (
        <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
          <div className="bg-background text-foreground p-8">
            <Story />
          </div>
        </div>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;