"use client";

import { useEffect, useRef } from "react";

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.trim().replace("#", "");
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (h.length === 6) {
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(67, 97, 238, ${alpha})`;
}

export default function AudioBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const styles = getComputedStyle(document.documentElement);
    const accentHex = styles.getPropertyValue("--color-accent").trim() || styles.getPropertyValue("--accent").trim() || "#4361ee";
    const barColor = hexToRgba(accentHex, 0.16);
    const glowColor = hexToRgba(accentHex, 0.06);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mediaQuery.matches;

    const bars = 120; // number of vertical bars
    const phases = new Array(bars).fill(0).map((_, i) => Math.random() * Math.PI * 2 + i * 0.33);
    const speeds = new Array(bars).fill(0).map(() => 0.4 + Math.random() * 0.8);

    let last = performance.now();
    const fps = reduced ? 0 : 30;
    const frameInterval = fps > 0 ? 1000 / fps : Infinity;
    let acc = 0;

    const draw = (now: number) => {
      const dt = now - last;
      last = now;
      acc += dt;
      if (acc < frameInterval) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      acc = 0;

      ctx.clearRect(0, 0, width, height);

      const barGap = 8;
      const barWidth = Math.max(2, Math.floor((width - bars * barGap) / bars));
      const maxH = Math.max(40, height * 0.45);

      // background subtle gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, glowColor);
      grad.addColorStop(0.5, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < bars; i++) {
        const x = i * (barWidth + barGap);
        const t = (now / 1000) * speeds[i] + phases[i];
        const noise = Math.sin(t) * 0.6 + Math.sin(t * 0.53 + i * 0.12) * 0.4 + Math.cos(t * 0.27 - i * 0.07) * 0.25;
        const h = Math.max(6, (0.5 + noise * 0.5) * maxH);
        const y = height * 0.6 - h * 0.5;

        // bar gradient
        const g = ctx.createLinearGradient(0, y, 0, y + h);
        g.addColorStop(0, hexToRgba(accentHex, 0.25));
        g.addColorStop(1, hexToRgba(accentHex, 0.05));

        ctx.fillStyle = g;
        ctx.fillRect(x, y, barWidth, h);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    if (!reduced) {
      animationRef.current = requestAnimationFrame(draw);
    } else {
      // Static snapshot
      draw(performance.now());
    }

    const vis = () => {
      if (document.hidden) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      } else if (!reduced) {
        last = performance.now();
        animationRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", vis);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      document.removeEventListener("visibilitychange", vis);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-[1] opacity-20 pointer-events-none" aria-hidden="true" />
  );
} 