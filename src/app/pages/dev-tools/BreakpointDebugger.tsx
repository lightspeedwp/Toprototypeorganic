/**
 * Breakpoint Debugger — Developer Tool
 *
 * Live viewport information with current breakpoint indicator,
 * pixel ratio, orientation, and touch capability detection.
 * Updates in real-time as the viewport resizes.
 *
 * @module BreakpointDebugger
 * @category dev-tools
 */

import { useState, useEffect } from "react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import {
  DeviceMobile,
  DeviceTablet,
  Desktop,
  Monitor,
  ArrowsOutSimple,
  BrowsersOutline,
  Hand,
  ArrowsHorizontal,
  ArrowsVertical,
  FrameCorners,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/*  Breakpoint definitions                                             */
/* ------------------------------------------------------------------ */

interface Breakpoint {
  name: string;
  minWidth: number;
  maxWidth: number | null;
  icon: React.ReactNode;
  tailwindPrefix: string;
}

const BREAKPOINTS: Breakpoint[] = [
  { name: "Mobile", minWidth: 0, maxWidth: 639, icon: <DeviceMobile className="w-5 h-5" />, tailwindPrefix: "default" },
  { name: "SM", minWidth: 640, maxWidth: 767, icon: <DeviceMobile className="w-5 h-5" />, tailwindPrefix: "sm:" },
  { name: "MD", minWidth: 768, maxWidth: 1023, icon: <DeviceTablet className="w-5 h-5" />, tailwindPrefix: "md:" },
  { name: "LG", minWidth: 1024, maxWidth: 1279, icon: <Desktop className="w-5 h-5" />, tailwindPrefix: "lg:" },
  { name: "XL", minWidth: 1280, maxWidth: 1535, icon: <Monitor className="w-5 h-5" />, tailwindPrefix: "xl:" },
  { name: "2XL", minWidth: 1536, maxWidth: null, icon: <Monitor className="w-5 h-5" />, tailwindPrefix: "2xl:" },
];

/* ------------------------------------------------------------------ */
/*  Common device presets                                               */
/* ------------------------------------------------------------------ */

interface DevicePreset {
  name: string;
  width: number;
  height: number;
}

const DEVICE_PRESETS: DevicePreset[] = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 14 Pro", width: 393, height: 852 },
  { name: "iPhone 14 Pro Max", width: 430, height: 932 },
  { name: "Samsung Galaxy S23", width: 360, height: 780 },
  { name: "iPad Mini", width: 768, height: 1024 },
  { name: "iPad Pro 11\"", width: 834, height: 1194 },
  { name: "iPad Pro 12.9\"", width: 1024, height: 1366 },
  { name: "MacBook Air 13\"", width: 1280, height: 800 },
  { name: "MacBook Pro 16\"", width: 1728, height: 1117 },
  { name: "Desktop 1080p", width: 1920, height: 1080 },
  { name: "Desktop 1440p", width: 2560, height: 1440 },
  { name: "Ultrawide 4K", width: 3840, height: 2160 },
];

/* ------------------------------------------------------------------ */
/*  Hook: live viewport data                                           */
/* ------------------------------------------------------------------ */

function useViewportInfo() {
  const [info, setInfo] = useState(() => getViewportInfo());

  useEffect(() => {
    const update = () => setInfo(getViewportInfo());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return info;
}

function getViewportInfo() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpr = window.devicePixelRatio || 1;
  const orientation = w > h ? "Landscape" : w < h ? "Portrait" : "Square";
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const activeBreakpoint = BREAKPOINTS.find(
    (bp) => w >= bp.minWidth && (bp.maxWidth === null || w <= bp.maxWidth),
  );

  return {
    width: w,
    height: h,
    dpr,
    orientation,
    isTouch,
    activeBreakpoint: activeBreakpoint?.name ?? "Unknown",
    scrollHeight: document.documentElement.scrollHeight,
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BreakpointDebugger() {
  const viewport = useViewportInfo();

  return (
    <>
      <DevToolsBreadcrumbs currentPage="Breakpoint Debugger" />

      {/* Hero */}
      <section className="wp-devtool__hero">
        <Container>
          <div className="wp-devtool__hero-inner">
            <div className="wp-devtool__hero-badge">
              <ArrowsOutSimple className="w-4 h-4" />
              Breakpoint Debugger
            </div>
            <h1>Breakpoint Debugger</h1>
            <p className="wp-devtool__hero-description">
              Live viewport metrics updating in real-time. Resize your browser to see breakpoint changes instantly.
            </p>
          </div>
        </Container>
      </section>

      {/* Current breakpoint bar */}
      <section className="wp-devtool__section">
        <Container>
          <div className="wp-devtool__section-header">
            <h2>Current Breakpoint</h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Active breakpoint is highlighted based on current viewport width.
            </p>
          </div>

          <div className="wp-devtool__breakpoint-bar">
            {BREAKPOINTS.map((bp) => {
              const isActive = bp.name === viewport.activeBreakpoint;
              return (
                <div
                  key={bp.name}
                  className={`wp-devtool__breakpoint-segment ${isActive ? "wp-devtool__breakpoint-segment--active" : ""}`}
                >
                  {bp.icon}
                  <span className="wp-devtool__breakpoint-label">{bp.name}</span>
                  <span className="wp-devtool__breakpoint-range">
                    {bp.minWidth}px{bp.maxWidth ? ` – ${bp.maxWidth}px` : "+"}
                  </span>
                  <span className="wp-devtool__breakpoint-range">{bp.tailwindPrefix}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Viewport info cards */}
      <section className="wp-devtool__section wp-devtool__section--alt">
        <Container>
          <div className="wp-devtool__section-header">
            <h2>Viewport Metrics</h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Real-time measurements of the current browser viewport.
            </p>
          </div>

          <div className="wp-devtool__viewport-info">
            <div className="wp-devtool__viewport-card">
              <div className="wp-devtool__viewport-icon">
                <ArrowsHorizontal className="w-5 h-5" />
              </div>
              <div className="wp-devtool__viewport-meta">
                <span className="wp-devtool__viewport-value">{viewport.width}px</span>
                <span className="wp-devtool__viewport-label">Viewport Width</span>
              </div>
            </div>

            <div className="wp-devtool__viewport-card">
              <div className="wp-devtool__viewport-icon">
                <ArrowsVertical className="w-5 h-5" />
              </div>
              <div className="wp-devtool__viewport-meta">
                <span className="wp-devtool__viewport-value">{viewport.height}px</span>
                <span className="wp-devtool__viewport-label">Viewport Height</span>
              </div>
            </div>

            <div className="wp-devtool__viewport-card">
              <div className="wp-devtool__viewport-icon">
                <FrameCorners className="w-5 h-5" />
              </div>
              <div className="wp-devtool__viewport-meta">
                <span className="wp-devtool__viewport-value">{viewport.dpr}x</span>
                <span className="wp-devtool__viewport-label">Device Pixel Ratio</span>
              </div>
            </div>

            <div className="wp-devtool__viewport-card">
              <div className="wp-devtool__viewport-icon">
                <BrowsersOutline className="w-5 h-5" />
              </div>
              <div className="wp-devtool__viewport-meta">
                <span className="wp-devtool__viewport-value">{viewport.orientation}</span>
                <span className="wp-devtool__viewport-label">Orientation</span>
              </div>
            </div>

            <div className="wp-devtool__viewport-card">
              <div className="wp-devtool__viewport-icon">
                <Hand className="w-5 h-5" />
              </div>
              <div className="wp-devtool__viewport-meta">
                <span className="wp-devtool__viewport-value">{viewport.isTouch ? "Yes" : "No"}</span>
                <span className="wp-devtool__viewport-label">Touch Capable</span>
              </div>
            </div>

            <div className="wp-devtool__viewport-card">
              <div className="wp-devtool__viewport-icon">
                <ArrowsVertical className="w-5 h-5" />
              </div>
              <div className="wp-devtool__viewport-meta">
                <span className="wp-devtool__viewport-value">{viewport.scrollHeight}px</span>
                <span className="wp-devtool__viewport-label">Scroll Height</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Device presets reference */}
      <section className="wp-devtool__section">
        <Container>
          <div className="wp-devtool__section-header">
            <h2>Common Device Sizes</h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Reference table of popular device viewport dimensions for responsive testing.
            </p>
          </div>

          <table className="wp-devtool__preview-table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Width</th>
                <th>Height</th>
                <th>Breakpoint</th>
              </tr>
            </thead>
            <tbody>
              {DEVICE_PRESETS.map((device) => {
                const bp = BREAKPOINTS.find(
                  (b) => device.width >= b.minWidth && (b.maxWidth === null || device.width <= b.maxWidth),
                );
                const isMatch =
                  Math.abs(device.width - viewport.width) < 20 &&
                  Math.abs(device.height - viewport.height) < 20;

                return (
                  <tr key={device.name}>
                    <td>
                      {device.name}
                      {isMatch && (
                        <span
                          style={{
                            color: "var(--success)",
                            fontFamily: "var(--font-family-noto-sans)",
                            fontSize: "var(--text-xs)",
                            fontWeight: "var(--font-weight-medium)",
                          }}
                        >
                          {" "}● Current
                        </span>
                      )}
                    </td>
                    <td style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-xs)" }}>
                      {device.width}px
                    </td>
                    <td style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-xs)" }}>
                      {device.height}px
                    </td>
                    <td style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-xs)", color: "var(--primary)" }}>
                      {bp?.name ?? "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
      </section>
    </>
  );
}
