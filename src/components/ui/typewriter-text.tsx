"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function TypewriterText({ text, className = "", delay = 0, once = true }: TypewriterTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split text into spans for each character to avoid breaking layout
    const chars = text.split("");
    textRef.current.innerHTML = chars
      .map(char => `<span class="char-unit" style="opacity: 0; display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const charElements = textRef.current.querySelectorAll('.char-unit');

    gsap.to(charElements, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.015,
      delay: delay,
      ease: "none",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 95%",
        toggleActions: once ? "play none none none" : "play none none reverse",
      }
    });
  }, [text, delay, once]);

  return <span ref={textRef} className={cn("inline-block", className)} />;
}
