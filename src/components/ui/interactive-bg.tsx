"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type Orb = {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
};

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createOrb = (): Orb => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 60 + 40, // smaller radius
      vx: (Math.random() - 0.5) * 1.2, // faster speed
      vy: (Math.random() - 0.5) * 1.2,
      opacity:0.4
    });

    const orbs: Orb[] = Array.from({ length: 12 }, createOrb); // more orbs

    const animate = () => {
      const isDark = theme === "dark";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Wrap around screen
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          orb.radius * 0.2,
          orb.x,
          orb.y,
          orb.radius
        );

        if (isDark) {
          gradient.addColorStop(0, `rgba(255, 44, 44, ${orb.opacity})`);
          gradient.addColorStop(1, "rgba(255,44,44,0)");
        } else {
          gradient.addColorStop(0, `rgba(239, 68, 68, ${orb.opacity})`);
          gradient.addColorStop(1, "rgba(239,68,68,0)");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }} // visible
    />
  );
}
