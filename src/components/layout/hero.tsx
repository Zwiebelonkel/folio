
"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      // Initial state for entrance
      tl.fromTo(imgRef.current, 
        { scale: 0.5, opacity: 0, rotate: -10, y: 100 }, 
        { scale: 1, opacity: 1, rotate: 0, y: 0, duration: 1.6, ease: "back.out(1.2)" }
      )
      .fromTo(titleRef.current,
        { y: 120, opacity: 0, skewY: 10 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.4, stagger: 0.2 },
        "-=1"
      )
      .fromTo(pRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=1"
      );

      // Subtle continuous floating animation
      gsap.to(imgRef.current, {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Mouse move parallax and shine tracking
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 50;
        const yPos = (clientY / window.innerHeight - 0.5) * 50;

        // Parallax for the avatar
        gsap.to(imgRef.current, {
          x: xPos,
          y: yPos,
          duration: 1.2,
          ease: "power2.out"
        });

        // Update shine position
        if (shineRef.current) {
          const rect = imgRef.current?.getBoundingClientRect();
          if (rect) {
            const shineX = ((clientX - rect.left) / rect.width) * 100;
            const shineY = ((clientY - rect.top) / rect.height) * 100;
            shineRef.current.style.setProperty('--x', `${shineX}%`);
            shineRef.current.style.setProperty('--y', `${shineY}%`);
          }
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-12 sm:py-24 text-center flex flex-col items-center overflow-hidden w-full px-4">
      {/* Avatar Container with Shine */}
      <div 
        ref={imgRef} 
        className="relative mb-10 p-1 group"
        style={{ perspective: '1000px' }}
      >
        <div className="relative rounded-full p-2 overflow-hidden luxury-glow border border-primary/20 bg-background/50 backdrop-blur-sm">
          {/* Shine effect overlay */}
          <div 
            ref={shineRef}
            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.3) 0%, transparent 60%)`,
            }}
          />
          <Image
            src="/images/profile2.png"
            alt="Luca Müller"
            width={160}
            height={160}
            className="rounded-full border-2 border-primary/30 shadow-2xl sm:w-[200px] sm:h-[200px] object-cover pointer-events-none"
            priority
          />
        </div>
      </div>
      
      {/* Title with Mask for Reveal - Added padding-bottom to prevent character clipping during skew */}
      <div className="overflow-hidden mb-4 pb-4">
        <h2 ref={titleRef} className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-8xl font-headline leading-[1.1] max-w-full break-words px-2">
          Creative <span className="text-primary italic inline-block relative">
            Developer
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-primary/30 animate-pulse" />
          </span> <br /> & Digital Artist
        </h2>
      </div>
      
      {/* Description */}
      <div className="overflow-hidden">
        <p ref={pRef} className="mt-8 max-w-2xl mx-auto text-lg sm:text-2xl text-muted-foreground font-light leading-relaxed px-4">
          Crafting <span className="text-foreground font-medium bg-primary/10 px-2 py-1 rounded-md">unique digital experiences</span> through code, 3D, and sound.
        </p>
      </div>
    </section>
  );
}
