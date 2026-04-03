import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  color: string;
}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];
    let particles: Particle[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const randomColor = () => {
      const r = Math.random();
      if (r > 0.92) return "#00d4ff";
      if (r > 0.84) return "#b000ff";
      if (r > 0.78) return "#f0d000";
      return "#ffffff";
    };

    const init = () => {
      // Stars
      stars = Array.from({ length: 250 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2 + 0.3,
        baseOpacity: Math.random() * 0.7 + 0.2,
        opacity: 0,
        twinkleSpeed: Math.random() * 0.025 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: randomColor(),
      }));

      // Floating nebula particles
      particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3.5 + 1,
        opacity: Math.random() * 0.25 + 0.05,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: Math.random() > 0.5 ? "#00d4ff" : "#b000ff",
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const bg = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.3, 0,
        canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.7
      );
      bg.addColorStop(0, "rgba(20, 10, 60, 0.4)");
      bg.addColorStop(0.5, "rgba(10, 5, 40, 0.2)");
      bg.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula glow patches
      const drawNebula = (cx: number, cy: number, r: number, color: string, alpha: number) => {
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grd.addColorStop(0, color.replace(")", `, ${alpha})`).replace("rgb(", "rgba("));
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      };

      drawNebula(canvas.width * 0.15, canvas.height * 0.25, 300, "rgb(0, 100, 180)", 0.08);
      drawNebula(canvas.width * 0.8, canvas.height * 0.6, 250, "rgb(100, 0, 180)", 0.07);
      drawNebula(canvas.width * 0.5, canvas.height * 0.8, 200, "rgb(0, 180, 200)", 0.05);

      // Draw stars
      time += 0.01;
      stars.forEach((star) => {
        star.opacity =
          star.baseOpacity *
          (0.6 + 0.4 * Math.sin(time * star.twinkleSpeed * 100 + star.twinklePhase));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle =
          star.color === "#ffffff"
            ? `rgba(255,255,255,${star.opacity})`
            : star.color === "#00d4ff"
            ? `rgba(0,212,255,${star.opacity})`
            : star.color === "#b000ff"
            ? `rgba(176,0,255,${star.opacity})`
            : `rgba(240,208,0,${star.opacity})`;
        ctx.fill();

        // Glow for colored stars
        if (star.color !== "#ffffff" && star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle =
            star.color === "#00d4ff"
              ? `rgba(0,212,255,${star.opacity * 0.15})`
              : `rgba(176,0,255,${star.opacity * 0.15})`;
          ctx.fill();
        }
      });

      // Draw nebula particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color === "#00d4ff"
            ? `rgba(0,212,255,${p.opacity})`
            : `rgba(176,0,255,${p.opacity})`;
        ctx.fill();

        // Blur glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color === "#00d4ff"
            ? `rgba(0,212,255,${p.opacity * 0.12})`
            : `rgba(176,0,255,${p.opacity * 0.12})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
