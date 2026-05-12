"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--x', `${e.clientX}px`);
        containerRef.current.style.setProperty('--y', `${e.clientY}px`);
      }
    };

    // Breathing pulse for grid
    gsap.to(gridRef.current, {
      opacity: 0.1,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-background"
    >
      {/* Base Grid Layer */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Glowing Grid Lines */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'repeat',
          maskImage: `radial-gradient(150px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(150px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 80%)`,
        }}
      />
      
      {/* Subtle depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--background))_100%)] opacity-40" />
    </div>
  );
}