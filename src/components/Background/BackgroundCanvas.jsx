import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const COLORS = ['#ff4455', '#4488ff', '#44dd88', '#ffcc44'];
const RAIN_CHARS = '01アイウエオカキ{}[]<>/\\|=+#@$%&*アウカキクケ01';

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function BackgroundCanvas() {
  const canvasRef   = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;
    let particles = [];
    let rainCols  = [];
    let mouse     = { x: -9999, y: -9999 };
    let lastTime  = 0;
    let mobile    = window.innerWidth < 768;   // ← cached, not recomputed per frame

    function initParticles() {
      particles = Array.from({ length: mobile ? 20 : 60 }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r:  Math.random() * 1.6 + 0.7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    }

    function initRain() {
      const cols = mobile ? 6 : 20;
      const colW = canvas.width / cols;
      rainCols = Array.from({ length: cols }, (_, i) => ({
        x:        i * colW + colW / 2,
        y:        -(Math.random() * canvas.height),
        speed:    1.1 + Math.random() * 1.4,
        chars:    [],
        maxLen:   6 + Math.floor(Math.random() * 8),
        color:    COLORS[Math.floor(Math.random() * COLORS.length)],
        tick:     0,
        tickMax:  3 + Math.floor(Math.random() * 3),
      }));
    }

    // Debounced resize so rapid window changes don't thrash init
    let resizeTimer;
    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        mobile = window.innerWidth < 768;
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
        initRain();
      }, 150);
    }

    function drawParticles() {
      for (const p of particles) {
        if (!mobile) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d  = Math.hypot(dx, dy);
          if (d < 110 && d > 0) {
            p.vx += (dx / d) * 0.06;
            p.vy += (dy / d) * 0.06;
          }
        }
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 1.3) { p.vx *= 0.94; p.vy *= 0.94; }
        p.x = (p.x + p.vx + canvas.width)  % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, 0.5);
        ctx.fill();
      }
      // Connections — skipped on mobile to save GPU
      if (!mobile) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d  = Math.hypot(dx, dy);
            if (d < 115) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(130,130,190,${(1 - d / 115) * 0.11})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    }

    function drawRain() {
      ctx.font = '12px "JetBrains Mono","Fira Code",monospace';
      for (const col of rainCols) {
        col.tick++;
        if (col.tick >= col.tickMax) {
          col.tick = 0;
          col.chars.push({ y: col.y, ch: RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)] });
          if (col.chars.length > col.maxLen) col.chars.shift();
        }
        col.y += col.speed;
        if (col.chars.length > 0 && col.chars[0].y > canvas.height + 180) {
          col.y    = -(Math.random() * canvas.height * 0.4);
          col.chars = [];
          col.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        col.chars.forEach((c, idx) => {
          c.y += col.speed;
          const isHead  = idx === col.chars.length - 1;
          const opacity = isHead ? 0.7 : (idx / col.chars.length) * 0.16;
          ctx.fillStyle = isHead
            ? `rgba(230,230,255,${opacity})`
            : hexToRgba(col.color, opacity);
          ctx.fillText(c.ch, col.x, c.y);
        });
      }
    }

    function frame(time) {
      animId = requestAnimationFrame(frame);
      const target = mobile ? 34 : 16;          // 30fps mobile / 60fps desktop
      if (time - lastTime < target) return;
      lastTime = time;
      ctx.fillStyle = 'rgba(10,10,15,0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawParticles();
      drawRain();
    }

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    if (!mobile) window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    // Initial setup
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
    initRain();
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced]);

  // Reduced-motion: render a static CSS dot-grid instead of canvas
  if (prefersReduced) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(68,136,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  );
}
