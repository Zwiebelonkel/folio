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
      
      tl.fromTo(imgRef.current, 
        { scale: 0, opacity: 0, rotate: -15 }, 
        { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "back.out(1.7)" }
      )
      .fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.6"
      )
      .fromTo(pRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-12 sm:py-24 text-center flex flex-col items-center overflow-hidden w-full px-4">
      {/* Liquid Glass Background Elements */}
      <div className="absolute top-0 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-primary/20 rounded-full blur-[80px] sm:blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-orange-500/10 rounded-full blur-[100px] sm:blur-[150px] -z-10" />

      <div ref={imgRef} className="relative mb-8 p-1 rounded-full bg-gradient-to-tr from-primary/40 to-transparent shrink-0">
        <Image
          src="/images/profile2.png"
          alt="Luca Müller"
          width={120}
          height={120}
          className="rounded-full border-4 border-background shadow-2xl sm:w-[160px] sm:h-[160px]"
          priority
        />
      </div>
      
      <h2 ref={titleRef} className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl font-headline leading-[1.1] max-w-full overflow-hidden">
        Creative <span className="text-primary italic">Developer</span> <br /> & Digital Artist
      </h2>
      
      <p ref={pRef} className="mt-6 sm:mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
        Passionate about crafting <span className="text-foreground font-medium">unique digital experiences</span>, from interactive games to immersive 3D web applications.
      </p>
    </section>
  );
}