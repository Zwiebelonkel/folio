"use client";

import { useEffect, useRef } from 'react';

export function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--x', `${e.clientX}px`);
        containerRef.current.style.setProperty('--y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden"
    >
      {/* Base Grid - Dark Lines */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Glowing Grid Lines - Only lines glow near cursor */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: `radial-gradient(250px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(250px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`,
        }}
      />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
    </div>
  );
}
