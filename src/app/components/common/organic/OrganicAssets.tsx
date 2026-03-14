import React, { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';

// Import SVGs as URLs (default behavior in this environment)
import savannahUrl from '../../../../imports/Savannah-contour-frame-light.svg';
import safariMedallionUrl from '../../../../imports/Safari-medallion-light.svg';
import botanicalCornerUrl from '../../../../imports/Botanical-corner-light.svg';

// Map all extracted hex codes to the organic token palette
const colorMap: Record<string, string> = {
  '#030202': 'var(--foreground)',
  '#100703': 'var(--foreground)',
  '#1E1B18': 'var(--foreground)',
  '#271D0F': 'var(--foreground)',
  '#2F2A23': 'var(--foreground)',
  '#39362E': 'var(--foreground)',
  '#3C392E': 'var(--foreground)',
  '#3D352D': 'var(--foreground)',
  '#3E3633': 'var(--foreground)',
  '#403D3A': 'var(--foreground)',
  '#433024': 'var(--foreground)',
  '#433F38': 'var(--foreground)',
  '#444336': 'var(--foreground)',
  '#45361E': 'var(--foreground)',
  '#464039': 'var(--foreground)',
  '#464538': 'var(--foreground)',
  '#4B4621': 'var(--muted-foreground)',
  '#4E4E3D': 'var(--muted-foreground)',
  '#50362F': 'var(--muted-foreground)',
  '#565548': 'var(--muted-foreground)',
  '#57554B': 'var(--muted-foreground)',
  '#59321A': 'var(--muted-foreground)',
  '#595A46': 'var(--muted)',
  '#655643': 'var(--muted)',
  '#656653': 'var(--muted)',
  '#686952': 'var(--muted)',
  '#6D6E56': 'var(--muted)',
  '#6F6E57': 'var(--muted)',
  '#706A62': 'var(--muted)',
  '#717259': 'var(--muted)',
  '#717F4E': 'var(--secondary)',
  '#726B5B': 'var(--secondary)',
  '#73523A': 'var(--secondary)',
  '#7A7D5E': 'var(--secondary)',
  '#7C706A': 'var(--secondary)',
  '#7E825F': 'var(--secondary)',
  '#818162': 'var(--secondary)',
  '#857D73': 'var(--secondary)',
  '#858181': 'var(--secondary)',
  '#8F8E75': 'var(--secondary)',
  '#91938D': 'var(--secondary)',
  '#986143': 'var(--accent)',
  '#999360': 'var(--accent)',
  '#9B7646': 'var(--accent)',
  '#A39780': 'var(--accent)',
  '#A47754': 'var(--accent)',
  '#A99E91': 'var(--accent)',
  '#AEA89A': 'var(--accent)',
  '#B3B6A4': 'var(--accent)',
  '#B57953': 'var(--accent)',
  '#B5B9A3': 'var(--accent)',
  '#B8B6B8': 'var(--accent)',
  '#C0B49F': 'var(--card)',
  '#C4B395': 'var(--card)',
  '#CAA383': 'var(--card)',
  '#CD925C': 'var(--primary)',
  '#CF915A': 'var(--primary)',
  '#D2CFC7': 'var(--card)',
  '#D6C8B1': 'var(--card)',
  '#DBD6CD': 'var(--card)',
  '#E7E4D5': 'var(--background)',
  '#EBE6D8': 'var(--background)',
  '#ECEBE7': 'var(--background)',
  '#FEFEFE': 'var(--background)'
};

/**
 * Utility to process the raw SVG string:
 * 1. Replaces hardcoded fill colors with CSS variables mapped to the design system.
 * 2. Removes hardcoded width/height to make it fully responsive via CSS.
 * 3. Normalizes sizing.
 */
function processOrganicSvg(rawSvg: string): string {
  let processed = rawSvg;
  
  // Replace colors
  for (const [hex, token] of Object.entries(colorMap)) {
    const regex = new RegExp(`fill="${hex}"`, 'gi');
    processed = processed.replace(regex, `fill="${token}"`);
  }
  
  // Make SVG responsive
  processed = processed.replace(/width="\d+"/, 'width="100%"');
  processed = processed.replace(/height="\d+"/, 'height="100%"');
  
  return processed;
}

/**
 * Cache for fetched and processed SVG strings.
 * Prevents re-fetching on every component mount.
 */
const svgCache = new Map<string, string>();

/**
 * Custom hook to fetch SVG content from a URL, process colors, and return the HTML string.
 */
function useProcessedSvg(url: string): string {
  const [svgHtml, setSvgHtml] = useState<string>(() => svgCache.get(url) || '');

  useEffect(() => {
    // If already cached, skip fetch
    if (svgCache.has(url)) {
      setSvgHtml(svgCache.get(url)!);
      return;
    }

    let cancelled = false;

    // If the import resolved to a string (some environments do support ?raw-like behavior),
    // process it directly without fetching.
    if (typeof url === 'string' && url.trim().startsWith('<svg')) {
      const processed = processOrganicSvg(url);
      svgCache.set(url, processed);
      setSvgHtml(processed);
      return;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch SVG: ${res.status}`);
        return res.text();
      })
      .then((rawSvg) => {
        if (cancelled) return;
        const processed = processOrganicSvg(rawSvg);
        svgCache.set(url, processed);
        setSvgHtml(processed);
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn('[OrganicAssets] Could not load SVG:', err.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return svgHtml;
}

interface OrganicAssetProps {
  className?: string;
}

/**
 * Savannah Contour Frame
 * Role: Environmental Depth
 * Placement: Hero backgrounds, section dividers.
 * Behaviour: Sits strictly behind content (z-0), can be cropped.
 */
export function SavannahContourFrame({ className }: OrganicAssetProps) {
  const svgHtml = useProcessedSvg(savannahUrl);

  if (!svgHtml) return null;

  return (
    <div 
      className={cn("wp-pattern-organic-frame", className)}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}

/**
 * Botanical Corner Flourish
 * Role: Structural Ornament
 * Placement: Edges of cards, blockquotes, CTAs.
 * Behaviour: Delicate framing, low visual weight.
 */
export function BotanicalCorner({ className }: OrganicAssetProps) {
  const svgHtml = useProcessedSvg(botanicalCornerUrl);

  if (!svgHtml) return null;

  return (
    <div 
      className={cn("wp-part-botanical-ornament", className)}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}

/**
 * Safari Medallion
 * Role: Featured Storytelling Asset
 * Placement: Premium tour cards, signature callouts.
 * Behaviour: Focal point, richer layers. Used sparingly.
 */
export function SafariMedallion({ className }: OrganicAssetProps) {
  const svgHtml = useProcessedSvg(safariMedallionUrl);

  if (!svgHtml) return null;

  return (
    <div 
      className={cn("wp-block-safari-badge", className)}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}
