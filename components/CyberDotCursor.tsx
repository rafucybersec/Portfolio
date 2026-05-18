import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

interface StarParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
}

const CyberDotCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<StarParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    return (hasTouchScreen && isSmallScreen) || mobileRegex.test(userAgent.toLowerCase());
  }, []);

  // Spawn star particles at cursor position
  const spawnParticle = useCallback(() => {
    const { x, y } = mouseRef.current;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1.5 + 0.3;
    particlesRef.current.push({
      x,
      y,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.4,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
    });

    // Cap particles for performance
    if (particlesRef.current.length > 40) {
      particlesRef.current.shift();
    }
  }, []);

  useEffect(() => {
    if (isMobile || !dotRef.current || !canvasRef.current) return;

    const dot = dotRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';

    // Size canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Set initial position
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    let spawnCounter = 0;

    const moveHandler = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power2.out', overwrite: true });

      // Spawn a trail particle every 2 mouse moves
      spawnCounter++;
      if (spawnCounter % 2 === 0) {
        spawnParticle();
      }
    };

    const enterHandler = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.closest('a, button, .cursor-target, [role="button"], input, textarea, select, label')) {
        gsap.to(dot, { scale: 1.6, duration: 0.25, ease: 'power2.out' });
      }
    };

    const leaveHandler = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.closest('a, button, .cursor-target, [role="button"], input, textarea, select, label')) {
        gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' });
      }
    };

    const mouseDownHandler = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.15, ease: 'power2.out' });
      // Burst of particles on click
      for (let i = 0; i < 8; i++) spawnParticle();
    };

    const mouseUpHandler = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.5)' });
    };

    // Star trail animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update position and life
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        p.vx *= 0.97;
        p.vy *= 0.97;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw 4-point star
        const alpha = p.opacity * p.life;
        const s = p.size * p.life;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#00ff9d';
        ctx.shadowColor = '#00ff9d';
        ctx.shadowBlur = s * 3;

        // Star shape
        ctx.beginPath();
        const spikes = 4;
        const outerR = s;
        const innerR = s * 0.35;
        for (let j = 0; j < spikes * 2; j++) {
          const r = j % 2 === 0 ? outerR : innerR;
          const angle = (j * Math.PI) / spikes - Math.PI / 2;
          const sx = p.x + Math.cos(angle) * r;
          const sy = p.y + Math.sin(angle) * r;
          if (j === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseover', enterHandler);
    window.addEventListener('mouseout', leaveHandler);
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler);
      window.removeEventListener('mouseout', leaveHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('resize', resize);
      document.body.style.cursor = originalCursor;
    };
  }, [isMobile, spawnParticle]);

  if (isMobile) return null;

  return (
    <>
      {/* Star trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ willChange: 'transform' }}
      />
      {/* Main cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[8px] h-[8px] rounded-full pointer-events-none z-[9999]"
        style={{
          willChange: 'transform',
          backgroundColor: '#00ff9d',
          boxShadow: '0 0 12px #00ff9d, 0 0 24px rgba(0,255,157,0.5), 0 0 40px rgba(0,255,157,0.2)',
        }}
      />
    </>
  );
};

export default CyberDotCursor;
