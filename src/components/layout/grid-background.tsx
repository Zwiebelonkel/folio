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
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-background"
    >
      {/* Base Grid Layer - Persistent subtle lines */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Glowing Grid Layer - Only lines glow near cursor */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, hsl(var(--primary)) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'repeat',
          maskImage: `radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`,
        }}
      />
      
      {/* Radial fade to edges to keep it focused and add depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_80%)] opacity-50" />
    </div>
  );
}
