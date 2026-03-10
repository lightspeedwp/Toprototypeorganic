import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface OrganicBlobWebGLProps {
  className?: string;
  color?: string; // Hex color string, e.g. "#F5F1E8"
}

export function OrganicBlobWebGL({ className, color = "#C87941" }: OrganicBlobWebGLProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    if (mediaQuery) {
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Minimal 2D fallback for WebGL blob morphing
    // We use Canvas 2D here to simulate organic blobs without needing full three.js / WebGL for lighter weight
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Simple organic blob math using sine waves
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4;
      
      for (let i = 0; i <= Math.PI * 2; i += 0.1) {
        const offset = Math.sin(i * 3 + time * 0.5) * 15 + Math.cos(i * 5 - time * 0.3) * 10;
        const r = radius + (reducedMotion ? 0 : offset);
        const x = centerX + Math.cos(i) * r;
        const y = centerY + Math.sin(i) * r;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();

      // Second overlapping blob
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      for (let i = 0; i <= Math.PI * 2; i += 0.1) {
        const offset = Math.sin(i * 4 - time * 0.4) * 20 + Math.cos(i * 2 + time * 0.6) * 15;
        const r = radius * 0.8 + (reducedMotion ? 0 : offset);
        const x = centerX + Math.cos(i + Math.PI / 4) * r + 40;
        const y = centerY + Math.sin(i + Math.PI / 4) * r - 20;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();

      if (!reducedMotion) {
        time += 0.05;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 600;
      if (reducedMotion) render(); // re-render static frame if resized
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    
    if (!reducedMotion) {
      render();
    } else {
      // Just render once
      render();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, reducedMotion]);

  return (
    <div className={cn("absolute inset-0 pointer-events-none mix-blend-multiply opacity-50", className)}>
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
}
