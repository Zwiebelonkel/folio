"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const showAnim = gsap.from(headerRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: "power2.out"
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm dark:bg-black/80"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div onClick={scrollToTop} className="flex items-center gap-3 cursor-pointer group">
            <Image 
              src="/images/LM_nobg.png" 
              alt="LM Logo"
              width={32} 
              height={32} 
              className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[360deg]"
            />
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline group-hover:text-primary transition-colors">
              Luca Müller
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}