"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      // Split text animation effect simulated by staggering elements
      tl.fromTo(imgRef.current, 
        { scale: 0, opacity: 0, rotate: -15, y: 50 }, 
        { scale: 1, opacity: 1, rotate: 0, y: 0, duration: 1.4, ease: "back.out(1.7)" }
      )
      .fromTo(titleRef.current,
        { y: 100, opacity: 0, skewY: 7 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2 },
        "-=0.8"
      )
      .fromTo(pRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.9"
      );

      // Subtle float animation
      gsap.to(imgRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Mouse move parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(imgRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-12 sm:py-24 text-center flex flex-col items-center overflow-hidden w-full px-4">
      {/* Background blobs removed for a cleaner look */}
      
      <div ref={imgRef} className="relative mb-8 p-1 rounded-full shrink-0">
        <Image
          src="/images/profile2.png"
          alt="Luca Müller"
          width={120}
          height={120}
          className="rounded-full border-4 border-background shadow-2xl sm:w-[160px] sm:h-[160px]"
          priority
        />
      </div>
      
      <div className="overflow-hidden">
        <h2 ref={titleRef} className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl font-headline leading-[1.1] max-w-full">
          Creative <span className="text-primary italic">Developer</span> <br /> & Digital Artist
        </h2>
      </div>
      
      <p ref={pRef} className="mt-6 sm:mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
        Passionate about crafting <span className="text-foreground font-medium">unique digital experiences</span>, from interactive games to immersive 3D web applications.
      </p>
    </section>
  );
}
