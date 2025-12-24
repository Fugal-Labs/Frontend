"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class moved fully outside the component and effect
    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;

      constructor(canvas: HTMLCanvasElement) {
        this.baseX = Math.random() * canvas.width;
        this.baseY = Math.random() * canvas.height;
        this.x = this.baseX;
        this.y = this.baseY;
        const speed = 0.15;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        const sizeType = Math.random();
        if (sizeType < 0.5) {
          this.size = Math.random() * 25 + 25;
        } else if (sizeType < 0.85) {
          this.size = Math.random() * 29 + 51;
        } else {
          this.size = Math.random() * 29 + 71;
        }
        this.opacity = Math.random() * 0.28 + 0.18;
      }

      update(mouseX: number, mouseY: number, canvas: HTMLCanvasElement) {
        this.x += (this.baseX - this.x) * 0.05;
        this.y += (this.baseY - this.y) * 0.05;
        this.x += this.vx;
        this.y += this.vy;
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          this.x -= dx * force * 0.03;
          this.y -= dy * force * 0.03;
        }
        if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseX > canvas.width) this.baseX = 0;
        if (this.baseY < 0) this.baseY = canvas.height;
        if (this.baseY > canvas.height) this.baseY = 0;
        this.baseX += this.vx;
        this.baseY += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const color = isDark ? "255, 44, 44" : "239, 68, 68";
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      // Determine if dark mode is active
      const isDark = theme === "dark";

      // Clear canvas with transparent background (no trail effect)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ==================== VARIANT 1: BUBBLES ====================
      // Update and draw particles as bubbles
      //   particles.forEach((particle) => {
      //     particle.update(mouseX, mouseY);
      //     particle.draw(ctx, isDark);
      //   });
      // =============================================================================

      // ==================== VARIANT 2: CONNECTED LINES ====================

      // Update and draw particles (smaller for connected lines effect)
      particles.forEach((particle) => {
        particle.update(mouseX, mouseY, canvas);
        // Draw smaller particles for line connections
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        const color = isDark ? "255, 44, 44" : "239, 68, 68";
        ctx.fillStyle = `rgba(${color}, 0.8)`;
        ctx.fill();
      });

      // Draw connection lines between nearby particles
      const connectionColor = isDark ? "255, 44, 44" : "239, 68, 68";
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${connectionColor}, ${
              0.8 * (1 - distance / 120)
            })`;
            ctx.lineWidth = 2.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      // ========================================================================================

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="bg-background">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.5 }}
      />
    </div>
  );
}
